"use server";

import { db } from "@/lib/db";

export async function getKeys(id: string) {
  try {
    const keys = await db.publicKey.findMany({
      where: {
        userId: id,
      },
    });

    return keys;
  } catch (error) {
    console.error(error);
  }
}
