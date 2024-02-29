"use server";

import { db } from "@/lib/db";

export async function updateStars(projectId: string) {
  try {
    const project = await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        stars: {
          increment: 1,
        },
      },
    });

    console.log("project: ", project);
    return project;
  } catch (error) {
    console.error(error);
  }
}
