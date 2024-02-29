import { FileNode } from "@/types/file-node";

export function sortChildren(rootNode: FileNode): void {
  if (rootNode.children) {
    rootNode.children.sort((a, b) => {
      if (a.type === "directory" && b.type === "file") {
        return -1; // Directories before files
      } else if (a.type === "file" && b.type === "directory") {
        return 1; // Files after directories
      } else {
        // If both are of the same type or if both are directories or files
        return a.name.localeCompare(b.name); // Sort alphabetically by name
      }
    });

    // Recursively sort children
    rootNode.children.forEach((child) => sortChildren(child));
  }
}
