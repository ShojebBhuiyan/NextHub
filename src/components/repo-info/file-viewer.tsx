"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface FileViewerProps {
  selectedFile: string;
  repository: string;
}

export default function FileViewer({
  selectedFile,
  repository,
}: FileViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [contentInfo, setContentInfo] = useState<{
    content: string;
    contentType: string;
  } | null>(null);
  const url = new URL(`http://64.227.180.57:3000/repository/file`);

  url.searchParams.append("repositoryPath", repository);
  url.searchParams.append("filePath", selectedFile);

  console.log(isImage);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const type = response.headers.get("Content-type")?.split(" ")[0];
        console.log(type);

        if (
          type === "image/svg+xml;" ||
          type === "image/jpeg;" ||
          type === "image/png;" ||
          type === "image/gif;" ||
          type === "image/webp;"
        ) {
          const data = await response.blob();

          setContentInfo({
            content: URL.createObjectURL(data),
            contentType: type!,
          });
          setIsImage(true);
        } else {
          const data = await response.text();
          // console.log(data);
          setContentInfo({
            content: data,
            contentType: type!,
          });

          setIsImage(false);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    if (selectedFile) {
      fetchContent();
    }
  }, [selectedFile]);
  return (
    <ScrollArea className="max-h-[75vh] w-full">
      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <div>
          {!isImage && (
            <SyntaxHighlighter language="javascript" showLineNumbers>
              {contentInfo?.content?.toString()!}
            </SyntaxHighlighter>
          )}
          {isImage && (
            <Image
              src={contentInfo?.content as string}
              alt="image"
              layout="fill"
            />
          )}
        </div>
      )}
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
