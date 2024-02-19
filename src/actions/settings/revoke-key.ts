"use server";

import { db } from "@/lib/db";

export async function revokeKey(id: string) {
  try {
    await db.publicKey.delete({
      where: {
        id,
      },
    });

    return {
      message: "Key has been revoked.",
    };
  } catch (error) {
    console.error(error);
  }
}
