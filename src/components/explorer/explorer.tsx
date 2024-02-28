"use client";

import { FileNode } from "@/types/file-node";
import { useState } from "react";

interface ExplorerProps {
  fileTree: FileNode[];
}

export default function Explorer({ fileTree }: ExplorerProps) {
  const [openDirectories, setOpenDirectories] = useState<string[]>([]);

  function toggleDirectory(name: string) {
    if (openDirectories.includes(name)) {
      setOpenDirectories(openDirectories.filter((dir) => dir !== name));
    } else {
      setOpenDirectories([...openDirectories, name]);
    }
  }

  function renderFileNode(node: FileNode, index: number) {
    const isOpen = openDirectories.includes(node.name);
    const toggleIcon = isOpen ? "-" : "+";

    return (
      <li key={index}>
        {node.type === "directory" ? (
          <div>
            <strong onClick={() => toggleDirectory(node.name)}>
              {toggleIcon} {node.name}
            </strong>
            {isOpen && node.children && (
              <ul>
                {node.children.map((child, idx) => renderFileNode(child, idx))}
              </ul>
            )}
          </div>
        ) : (
          <span>{node.name}</span>
        )}
      </li>
    );
  }
  return (
    <div>
      <h1>File Explorer</h1>
      <ul>{fileTree.map((node, index) => renderFileNode(node, index))}</ul>
    </div>
  );
}
