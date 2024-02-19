const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
const mappingFilePath = "/path/to/repos.map"; // Update this path to match your actual mapping file path

app.use(express.json());
app.use(cors());

const PORT = 3000; // Define a port to listen on

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

app.get("/repository", (req, res) => {
  const { username, repoName } = req.body;

  exec(
    `cd /srv/git/${username}/${repoName}.git && git log --name-status --pretty=format:"{ \"commitHash\": \"%h\", \"commitMessage\": \"%s\" }"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send("Error fetching Git repository information");
        return;
      }

      if (!stdout.trim()) {
        res.status(404).send("Git repository is empty");
        return;
      }

      const commits = stdout.trim().split("\n\n");
      const filesMap = new Map();

      // Parse commit information
      commits.forEach((commit) => {
        const commitInfo = JSON.parse(commit);
        const lines = commit.split("\n");
        const commitHash = commitInfo.commitHash;
        const commitMessage = commitInfo.commitMessage;
        lines.shift(); // Remove the commit info line
        lines.forEach((line) => {
          const [status, filePath] = line.trim().split("\t");
          const file = filesMap.get(filePath) || {
            name: filePath,
            isFolder: false,
            items: [],
            commitMessage: "",
            commitHash: "",
          };
          file.commitMessage = commitMessage;
          file.commitHash = commitHash;
          filesMap.set(filePath, file);
        });
      });

      // Build JSON structure
      const root = { name: "root", isFolder: true, items: [] };
      filesMap.forEach((file) => {
        const segments = file.name.split("/");
        let currentDir = root;
        for (let i = 0; i < segments.length - 1; i++) {
          const segment = segments[i];
          let subDir = currentDir.items.find(
            (item) => item.name === segment && item.isFolder
          );
          if (!subDir) {
            subDir = { name: segment, isFolder: true, items: [] };
            currentDir.items.push(subDir);
          }
          currentDir = subDir;
        }
        currentDir.items.push(file);
      });

      res.json(root);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
