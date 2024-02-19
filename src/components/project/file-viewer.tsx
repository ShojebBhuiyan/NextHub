"use client";

import React, { useEffect, useState } from "react";
import FolderHandler from "./folder-handler";

interface FileViewerProps {
  username: string;
  reponame: string;
}

export default function FileViewer({ username, reponame }: FileViewerProps) {
  const [file, setFile] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${new URL(`${process.env.GIT_SERVER_ADDRESS}/repository`)}`,
          {
            body: JSON.stringify({ reponame }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setFile(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    return () => {};
  }, []);

  return (
    <div>
      <FolderHandler explorer={file} />
    </div>
  );
}
