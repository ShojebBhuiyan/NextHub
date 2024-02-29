function parseFilePaths(filePaths) {
  const combinedDirectory = {
    name: "root",
    type: "directory",
    children: [],
  };

  for (const filePath of filePaths) {
    const parts = filePath.split("/");
    let currentNode = combinedDirectory;

    for (const part of parts) {
      const isFile = part === parts[parts.length - 1];
      const existingNode = currentNode.children?.find(
        (node) => node.name === part
      );

      if (existingNode) {
        currentNode = existingNode;
      } else {
        const newNode = {
          name: part,
          type: isFile ? "file" : "directory",
          children: [],
        };
        currentNode.children?.push(newNode);
        currentNode = newNode;
      }
    }
  }

  return combinedDirectory;
}

module.exports = parseFilePaths;
