"use client";

import { FormEvent, useState } from "react";
import { useChat } from "ai/react";
import { SendIcon } from "lucide-react";
import getSystemPrompt from "@/lib/get-prompt";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useSession } from "next-auth/react";

interface AIChatBoxProps {
  skill: string[];
  title: string;
  description: string;
}

export default function AIChatBox({
  skill,
  title,
  description,
}: AIChatBoxProps) {
  const [systemPrompt, setSystemPrompt] = useState(
    getSystemPrompt(description, title, skill)
  );
  const username = useSession().data?.user?.name;
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "",
        role: "system",
        content: systemPrompt,
      },
    ],
  });

  return (
    <div className="w-full">
      <div className="flex min-w-[75vw] h-[30rem] flex-col-reverse overflow-y-auto rounded-lg border-2 border-primary">
        <ul className="flex flex-col">
          {messages
            .filter((message) => message.role !== "system")
            .map((message, index) => (
              <li className="py-4" key={index}>
                {message.role === "user" ? (
                  <div className="md:text-md flex flex-col items-end gap-2 px-2 text-lg">
                    <Avatar>
                      <AvatarFallback className="bg-[#0DA1CF14]">
                        {username?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="h-fit w-fit rounded-md bg-[#0DA1CF14] p-2">
                      <span className="whitespace-pre-line">
                        {message.content}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="md:text-md flex flex-col gap-2 self-end p-2 text-lg">
                    <Avatar>
                      <AvatarFallback className="bg-primary">S</AvatarFallback>
                    </Avatar>
                    <div className="h-fit w-fit rounded-md bg-primary p-2">
                      <span className="whitespace-pre-line">
                        {message.content}
                      </span>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-2 flex h-[15rem] flex-col items-start space-y-5"
      >
        <Textarea
          placeholder="Say hello!"
          onChange={handleInputChange}
          value={input}
          className="h-full border-2 border-primary text-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey)
              handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
          }}
        />
        <Button className="self-end">
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}
