import { db } from "@/lib/db";

type RequestBody = {
  userId: string;
};

export async function POST(req: Request) {
  const { userId }: RequestBody = await req.json();

  try {
    const keys = await db.publicKey.findMany({
      where: {
        userId,
      },
    });

    return {
      status: 200,
      body: keys,
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: "Something went wrong!",
      },
    };
  }
}
