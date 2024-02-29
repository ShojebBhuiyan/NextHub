"use client";

import { FileNode } from "@/types/file-node";
import Explorer from "./explorer";
import { useState } from "react";
import FileViewer from "./file-viewer";
import ProjectInstructions from "../project/project-instructions";

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
    <div className="flex gap-5 w-full">
      {fileTree.children &&
      fileTree.children[0].name === "" &&
      fileTree.children[0].children?.length === 0 ? (
        <ProjectInstructions
          url={`${username.replace(/ /g, "-")}/${projectId.replace(
            / /g,
            "."
          )}.git`}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
