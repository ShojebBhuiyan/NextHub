"use server";

import { db } from "@/lib/db";

export async function createProject(
  userId: string,
  username: string,
  title: string,
  description: string,
  skills: string[]
) {
  try {
    const project = await db.project.create({
      data: {
        title,
        description,
        skills,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const url = new URL(`${process.env.GIT_SERVER_ADDRESS}/repository/create`);

    console.log("url: ", url);

    const res = await fetch(url, {
      body: JSON.stringify({
        username: username.replace(/ /g, "-"),
        email: "",
        repoName: title.replace(/ /g, "-"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      await db.project.delete({
        where: {
          id: project.id,
        },
      });
      return { error: "Git repo creation failed!" };
    }

    return { ...project, error: undefined };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
}
