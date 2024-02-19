"use server";

import { db } from "@/lib/db";

export async function addKey(userId: string, key: string, keyName: string) {
  try {
    const publicKey = await db.publicKey.create({
      data: {
        publicKey: key,
        keyName,
        userId,
      },
    });

    const url = new URL(process.env.GIT_SERVER_ADDRESS!);

    const res = await fetch(url, {
      body: JSON.stringify({ publicKey }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      await db.publicKey.delete({
        where: {
          id: publicKey.id,
        },
      });
      return { error: "Something went wrong!" };
    }

    return { ...publicKey, error: undefined };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
}
