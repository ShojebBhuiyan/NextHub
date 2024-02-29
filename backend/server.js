const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const parseFilesPath = require("./parse-file-path");
const simpleGit = require("simple-git");
simpleGit().clean(simpleGit.CleanOptions.FORCE);

// Create an Express application
const app = express();
// const mappingFilePath = '/etc/nginx/repos.map'; // Update this path to match your actual mapping file path

app.use(express.json());
app.use(cors());

const PORT = 3000; // Define a port to listen on

// Define a sample route
app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hello, world! This is a simple Express backend.");
});

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
  const repoPath = `~/git/${username}/${repoName}.git`;

  exec(`sudo git init --bare ${repoPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: "Could not create repository" });
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    exec(`sudo chown -R git:git ${repoPath}`);

    return res.status(200).json({ message: "Repository created successfully" });
  });
});

app.get("/repository", (req, res) => {
  const repositoryPath = req.query.repositoryPath;
  if (!repositoryPath) {
    return res.status(400).send("Repository path is required");
  }

  exec(
    `cd ${repositoryPath} && git ls-tree --full-tree -r main | awk '{print $4}'`,
    (err, stdout) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching Git repository info.");
      }

      const entries = stdout.trim().split("\n");

      const directory = parseFilesPath(entries);

      console.log(directory);

      res.json(directory);
    }
  );
});

app.get("/repository/file", async (req, res) => {
  try {
    const filePath = req.query.filePath;
    const repoPath = req.query.repositoryPath;

    console.log(repoPath);

    console.log(filePath);

    const git = simpleGit({ baseDir: repoPath });

    console.log("Inside repo");

    // Fetch the file from the repository
    const content = await git.show(["HEAD:" + filePath]);

    console.log(content);

    // Set Content-Type header based on file extension
    const contentType = getContentType(filePath);
    console.log(contentType);
    res.set("Content-Type", contentType);

    // Send the content of the file
    res.send(content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

function getContentType(filePath) {
  // Add more mime types as needed
  const mimeTypes = {
    ".txt": "text/plain",
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jfif": "image/jpeg",
    ".pjpeg": "image/jpeg",
    ".pjp": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".png": "image/png",
    ".svg": "image/svg+xml",
  };

  const extension = "." + filePath.split(".").pop();
  console.log(extension);
  return mimeTypes[extension] || "application/octet-stream";
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
