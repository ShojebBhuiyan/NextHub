import CreateProjectForm from "@/components/project/create-project-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ProjectForm() {
  return (
    <div className="container h-[90vh] flex justify-center items-center">
      <Card className="w-[50vw] shadow-md">
        <CardHeader className="flex w-full">
          <p className="flex font-semibold text-3xl justify-center items-center">
            Project Creation Form
          </p>
        </CardHeader>
        <CardContent className="flex-col space-y-4">
          <CreateProjectForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
