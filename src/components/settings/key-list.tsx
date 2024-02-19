"use client";

import { Button } from "../ui/button";
import { revokeKey } from "@/actions/settings/revoke-key";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { PublicKey } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function KeyList() {
  const [keys, setKeys] = useState<PublicKey[] | null>();
  const userId = useSession().data?.user?.id;

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetch(`/api/get-keys`, {
          body: JSON.stringify({ userId }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: PublicKey[] | null = await response.json();
        setKeys(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKeys();
  }, []);
  return (
    <div className="flex flex-col">
      {keys?.map((key) => (
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <p>{key.keyName}</p>
            <Button
              variant={"destructive"}
              onClick={async () => {
                await revokeKey(key.id!);
              }}
            >
              Revoke
            </Button>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
}
