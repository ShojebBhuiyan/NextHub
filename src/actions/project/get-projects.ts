"use server";

import { db } from "@/lib/db";

export async function getProjects() {
  try {
    const projects = await db.project.findMany({
      take: 10,
    });

    return projects;
  } catch (error) {
    console.error(error);
  }
}
