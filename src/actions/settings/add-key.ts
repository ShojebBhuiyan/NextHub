"use server";

import { db } from "@/lib/db";

export async function addKey(userId: string, key: string, keyName: string) {
  try {
    const createdKey = await db.publicKey.create({
      data: {
        publicKey: key,
        keyName,
        userId,
      },
    });

    const url = new URL(`${process.env.GIT_SERVER_ADDRESS}/add-ssh-key`);

    console.log("url: ", url);

    const res = await fetch(url, {
      body: JSON.stringify({ publicKey: createdKey.publicKey }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      await db.publicKey.delete({
        where: {
          id: createdKey.id,
        },
      });
      return { error: "SSH went wrong!" };
    }

    return { ...createdKey, error: undefined };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
}
