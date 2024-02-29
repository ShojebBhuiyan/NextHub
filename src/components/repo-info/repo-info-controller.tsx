"use client";

import { FileNode } from "@/types/file-node";
import Explorer from "./explorer";
import { useState } from "react";
import FileViewer from "./file-viewer";

interface RepoInfoControllerProps {
  fileTree: FileNode;
  username: string;
  projectId: string;
}

export default function RepoInfoController({
  fileTree,
  username,
  projectId,
}: RepoInfoControllerProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  return (
    <div className="flex w-full">
      <Explorer
        fileTree={fileTree}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      {selectedFile && (
        <FileViewer
          selectedFile={selectedFile}
          repository={`/home/git/git/${username}/${projectId}.git`}
        />
      )}
    </div>
  );
}
