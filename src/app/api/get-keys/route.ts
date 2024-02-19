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

    return new Response(JSON.stringify(keys), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Something went wrong!",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
