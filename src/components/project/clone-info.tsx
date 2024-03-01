import Link from "next/link";

interface CloneInfoProps {
  url: string;
}

export default function CloneInfo({ url }: CloneInfoProps) {
  return (
    <>
      <div className="container flex flex-col w-full justify-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">
          Project Clone Instructions
        </h1>
        <p className="mb-4">
          Follow the instructions below to clone your repository:
        </p>
        <ul className="mb-4">
          <li>
            1. First configure your public key in the{" "}
            <Link href="/settings">Settings</Link> if you haven&apos;t already
          </li>
          <li>2. Open your terminal or command prompt.</li>
          <li>
            3. Navigate to the directory where you want to clone the project.
          </li>
          <li>4. Run the following commands:</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <code>{`git clone git@64.227.180.57:/git/${url}`}</code>
        </div>
      </div>
    </>
  );
}
