import Head from "next/head";

export default function CreateRepoPage() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Create Repository</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-purple-700">
        Create a New Repository
      </h1>
      <p className="mb-4">
        Follow the instructions below to create a new repository:
      </p>
      <ol className="mb-4">
        <li>Open your terminal or command prompt.</li>
        <li>
          Navigate to the directory where you want to create the repository.
        </li>
        <li>Run the following commands:</li>
      </ol>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>mkdir my-new-repo</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>cd my-new-repo</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>git init</code>
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
        <code>git remote add origin your_repository_url</code>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <code>git push -u origin master</code>
      </div>
      <p>
        Replace <code>your_repository_url</code> with the URL of your remote
        repository.
      </p>
    </div>
  );
}
