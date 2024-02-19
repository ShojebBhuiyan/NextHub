"use client";

import { Button } from "../ui/button";
import { revokeKey } from "@/actions/settings/revoke-key";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { PublicKey } from "@prisma/client";
import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-col w-full">
          <p className="flex font-semibold text-3xl justify-center items-center">
            Existing Keys
          </p>
        </CardHeader>
        <CardContent className="flex-col space-y-4">
          <div className="flex flex-col">
            {keys?.map((key) => (
              <div key={key.id} className="w-full space-y-2">
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
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
