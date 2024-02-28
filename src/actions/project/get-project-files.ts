"use server";

import { FileNode } from "@/types/file-node";

export async function getProjectFiles(username: string, projectId: string) {
  try {
    const url = new URL(`${process.env.GIT_SERVER_ADDRESS}/repository`);
    const response = await fetch(
      url + `/svr/git/${username}/${projectId}.git`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const directory: FileNode[] = await response.json();

    return directory;
  } catch (error) {
    console.error(error);
  }
}
