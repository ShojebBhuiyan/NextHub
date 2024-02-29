"use client";

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";
import { updateStars } from "@/actions/project/update-stars";

interface StarButtonProps {
  stars: number;
  projectId: string;
}

export default function StarButton({ stars, projectId }: StarButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [starCount, setStarCount] = useState(stars);
  const form = useForm();

  function onSubmit() {
    startTransition(() => {
      setStarCount(starCount + 1);

      updateStars(projectId);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Button className="gap-2" type="submit">
          <Star /> {starCount}
        </Button>
      </form>
    </Form>
  );
}
