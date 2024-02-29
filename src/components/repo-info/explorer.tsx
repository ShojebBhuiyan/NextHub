"use client";

import { FileNode } from "@/types/file-node";
import { File as FileIcon, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface ExplorerProps {
  fileTree: FileNode;
  selectedFile: string | null;
  setSelectedFile: (file: string) => void;
}

export default function Explorer({
  fileTree,
  selectedFile,
  setSelectedFile,
}: ExplorerProps) {
  console.log(fileTree);
  // console.log(Array.isArray(fileTree.children));
  const [openDirectories, setOpenDirectories] = useState<string[]>([]);

  function toggleDirectory(name: string) {
    if (openDirectories.includes(name)) {
      setOpenDirectories(openDirectories.filter((dir) => dir !== name));
    } else {
      setOpenDirectories([...openDirectories, name]);
    }
  }

  function renderFileNode(node: FileNode, index: number, path: string = "") {
    const newPath = path ? `${path}/${node.name}` : node.name;

    const isOpen = openDirectories.includes(node.name);
    console.log("Inside renderFileNode");
    return (
      <li key={index}>
        {node.type === "directory" ? (
          <div>
            <Button
              variant={"ghost"}
              className="flex gap-2"
              onClick={() => toggleDirectory(node.name)}
            >
              {isOpen ? (
                <>
                  <FolderOpen className="text-primary" />
                  <span className="text-primary">{node.name}</span>
                </>
              ) : (
                <>
                  <Folder />
                  <span>{node.name}</span>
                </>
              )}
            </Button>
            {isOpen && node.children && (
              <ul className="pl-5" onClick={() => {}}>
                {node.children.map((child, idx) =>
                  renderFileNode(child, idx, newPath)
                )}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              className="flex gap-2"
              onClick={() => {
                console.log(newPath);
                setSelectedFile?.(newPath);
              }}
            >
              <FileIcon />
              {selectedFile === newPath ? (
                <span className="text-green-500">{node.name}</span>
              ) : (
                <span>{node.name}</span>
              )}
            </Button>
          </div>
        )}
      </li>
    );
  }
  return (
    <ScrollArea className="min-h-[50vh] max-h-[75vh] min-w-[30vh]">
      <div className="container flex flex-col gap-5">
        <ul>
          {fileTree.children?.map((node, index) => renderFileNode(node, index))}
        </ul>
      </div>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
