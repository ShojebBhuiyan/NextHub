interface ProjectInstructionsProps {
  url: string;
}

export default function ProjectInstructions({ url }: ProjectInstructionsProps) {
  return (
    <div className="container flex flex-col w-full justify-center">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">
        Empty Repository
      </h1>
      <p className="mb-4">
        Follow the instructions below to push your first commit:
      </p>
      <ul className="mb-4">
        <li>1. Open your terminal or command prompt.</li>
        <li>2. Navigate to the directory where you want your local files.</li>
        <li>3. Run the following commands:</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>mkdir my-new-repo</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>cd my-new-repo</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>git init .</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>touch README.md</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>git add README.md</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>git commit -m "Initial commit"</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>{`git remote add origin git@64.227.180.57:/git/${url}`}</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>git push -u origin master</code>
      </div>
    </div>
  );
}
