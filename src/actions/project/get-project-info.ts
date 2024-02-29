"use server";

import { db } from "@/lib/db";

export async function getProjectInfo(username: string, projectId: string) {
  try {
    const project = await db.project.findFirst({
      where: {
        title: projectId,
        user: {
          name: username,
        },
      },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
}
