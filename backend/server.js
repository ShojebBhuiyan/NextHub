const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
const mappingFilePath = "/path/to/repos.map"; // Update this path to match your actual mapping file path for nginx

app.use(express.json());
app.use(cors());

const PORT = 3000; // Define a port to listen on

// Endpoint to handle adding SSH public keys
app.post("/add-ssh-key", (req, res) => {
  const { publicKey } = req.body;

  // Directory where authorized keys are stored
  const authorizedKeysPath = "/home/git/.ssh/authorized_keys"; // Adjust this path based on your server configuration

  // Append the public key to the authorized keys file
  fs.appendFile(authorizedKeysPath, publicKey + "\n", (err) => {
    if (err) {
      console.error("Error adding SSH public key:", err);
      return res.status(500).json({ error: "Error adding SSH public key" });
    }
    console.log("SSH public key added successfully");
    return res
      .status(200)
      .json({ message: "SSH public key added successfully" });
  });
});

app.post("/repository/create", (req, res) => {
  const { username, email, repoName } = req.body;
  const repoPath = `/srv/git/${username}/${repoName}.git`;

  exec(
    `cd /srv/git && sudo git init --bare ${repoPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: "Could not create repository" });
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Set the Git user configuration
      exec(
        `cd ${repoPath} && git config user.name "${username}" && git config user.email "${email}"`,
        (configError, configStdout, configStderr) => {
          if (configError) {
            console.error(`Git config error: ${configError}`);
            res.status(500).send("Error configuring Git user");
            return;
          }
        }
      );

      // Set safe repo
      exec(
        `git config --global --add safe.directory ${repoPath}`,
        (configError, configStdout, configStderr) => {
          if (configError) {
            console.error(`Git config error: ${configError}`);
            res.status(500).send("Error configuring safe repo!");
            return;
          }
        }
      );

      const mappingEntry = `${username}/${repoName}    ${repoPath};\n`;
      fs.appendFile(mappingFilePath, mappingEntry, (err) => {
        if (err) {
          console.error(`Error updating mapping file: ${err.message}`);
          return res.status(500).json({ error: "Error updating mapping file" });
        }
        console.log(`Mapping file updated with new entry: ${mappingEntry}`);
      });

      return res
        .status(200)
        .json({ message: "Repository created successfully" });
    }
  );
});

// Function to recursively retrieve directory structure
function getDirectoryStructure(path) {
  return new Promise((resolve, reject) => {
    exec(`cd ${repoPath} && git ls-files --stage`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
        return;
      }

      const files = stdout
        .split('\n')
        .filter(Boolean)
        .map(line => {
            const [fileMode, , , fileName] = line.split(/\s+/);
            return { fileMode, fileName };
        });

      const root = { id: "1", name: "root", isFolder: true, items: [] };
      const structure = { "": root };

      files.forEach(({ fileName }) => {
        const pathItems = fileName.split("/");
        let currentPath = "";
        pathItems.forEach(item => {
            currentPath += item;
            if (!structure[currentPath]) {
                structure[currentPath] = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: item,
                    isFolder: true,
                    items: []
                };
                structure[currentPath.substr(0, currentPath.length - item.length)]?.items.push(structure[currentPath]);
            }
            currentPath += "/";
        });
      });

      resolve(root);
    });
  });
}

// Endpoint to retrieve directory structure
app.get('/repository/create', async (req, res) => {
    try {
        const directoryStructure = await getDirectoryStructure(repoPath);
        res.json(directoryStructure);
    } catch (error) {
        console.error(`Error getting directory structure: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
