"use server";

import { db } from "@/lib/db";

export async function getProjectsByUserName(name: string) {
  try {
    const decodedName = decodeURIComponent(name);
    const projects = await db.project.findMany({
      where: {
        user: {
          name: decodedName,
        },
      },
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
