import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import KeyForm from "./key-form";
import KeyInstructions from "./key-instructions";
export default function SettingsForm() {
  return (
    <div className="flex flex-col">
      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-col w-full">
          <p className="flex font-semibold text-3xl justify-center items-center">
            Add new public key
          </p>
          <KeyInstructions />
        </CardHeader>
        <CardContent className="flex-col space-y-4">
          <KeyForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
