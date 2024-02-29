"use client";

import { createProject } from "@/actions/project/create-project";
import { ProjectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormError from "../form-error";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { skills } from "@/constants/skills";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

export default function CreateProjectForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const user = useSession().data?.user!;
  const router = useRouter();
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      description: "",
      skills: [],
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof ProjectSchema>) {
    startTransition(() => {
      setError(undefined);

      createProject(
        user.id!,
        user.name!,
        user.email!,
        values.title,
        values.description,
        values.skills
      ).then((data) => {
        if (data?.error) {
          setError(data?.error);
        } else {
          router.push(`/${user.name}/${values.title}`);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} id="description" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormDescription>
                      Select the skills required for this project
                    </FormDescription>
                  </div>
                  {skills.map((skill) => (
                    <FormField
                      key={skill.id}
                      control={form.control}
                      name="skills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={skill.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(skill.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, skill.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== skill.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {skill.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={isPending}
            >
              Create Project
            </Button>
          </div>
        </>
      </form>
    </Form>
  );
}
