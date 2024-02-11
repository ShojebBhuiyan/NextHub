import { auth, signOut } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
