"use server";

import { db } from "@/lib/db";

export async function getProjectsBySkill(skill: string) {
  try {
    const projects = await db.project.findMany({
      take: 10,
      where: {
        skills: {
          has: skill,
        },
      },
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
