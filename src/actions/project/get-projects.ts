"use server";

import { db } from "@/lib/db";

export async function getProjects() {
  try {
    const projects = await db.project.findMany({
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return projects;
  } catch (error) {
    console.error(error);
  }
}
