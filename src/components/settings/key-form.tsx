"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { KeySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import FormError from "../form-error";
import { Button } from "../ui/button";
import { addKey } from "@/actions/settings/add-key";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Textarea } from "../ui/textarea";

export default function KeyForm() {
  const userId = useSession().data?.user?.id;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();

  const form = useForm<z.infer<typeof KeySchema>>({
    resolver: zodResolver(KeySchema),
    defaultValues: {
      publicKey: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof KeySchema>) {
    startTransition(() => {
      setError(undefined);

      addKey(userId!, values.publicKey, values.name)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
        })
        .finally(() => {
          form.reset();
          router.refresh();
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="publicKey">Public Key</FormLabel>
                  <FormControl>
                    <Textarea {...field} id="publicKey" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError message={error} />}
          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={isPending}
          >
            Create Key
          </Button>
        </>
      </form>
    </Form>
  );
}
