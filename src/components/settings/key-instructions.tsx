export default function KeyInstructions() {
  return (
    <div className="flex flex-col gap-5 text-xl">
      <h1 className="text-xl font-bold">Instructions</h1>
      <p>
        {
          "1. To generate an SSH key, open a terminal and run the following command:"
        }
      </p>
      <div className="flex w-full justify-center">
        <pre className="w-fit bg-secondary p-2 rounded-md">
          <code>ssh-keygen -t rsa -b 4096 -C "youremail@example.com"</code>
        </pre>
      </div>

      <p>
        {
          " 2. You can leave the passphrase empty if you want to use the key without entering a password."
        }
      </p>
      <p>
        {
          "3. After running the command, you will be prompted to choose a location to save the key. The default location is usually fine."
        }
      </p>
      <p>
        {
          " 4. Once the key is generated, check the created .pub file for the key."
        }
      </p>
      <p>
        {
          "5. Now you can add the key to your account by pasting it into the form below."
        }
      </p>
    </div>
  );
}
