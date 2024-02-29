"use server";

import { FileNode } from "@/types/file-node";
import { sortChildren } from "@/utils/sort-children";

export async function getProjectFiles(username: string, projectId: string) {
  try {
    const url = new URL(`${process.env.GIT_SERVER_ADDRESS}/repository`);
    const response = await fetch(
      url +
        `?repositoryPath=~/git/${username.replace(
          / /g,
          "-"
        )}/${projectId.replace(/ /g, ".")}.git`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const directory: FileNode = await response.json();
    sortChildren(directory);

    console.log(directory);
    return directory;
  } catch (error) {
    console.error(error);
  }
}
