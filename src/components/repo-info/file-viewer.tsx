"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";

interface FileViewerProps {
  selectedFile: string;
  repository: string;
}

export default function FileViewer({
  selectedFile,
  repository,
}: FileViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [contentInfo, setContentInfo] = useState<{
    content: string;
    contentType: string;
  } | null>(null);
  const url = new URL(`http://64.227.180.57:3000/repository/file`);

  url.searchParams.append("repositoryPath", repository);
  url.searchParams.append("filePath", selectedFile);

  console.log(contentInfo);

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

        const type = response.headers.get("Content-type");
        console.log(type);

        if (type === "text/plain" || "application/octet-stream") {
          const data = await response.text();
          // console.log(data);
          setContentInfo({
            content: data,
            contentType: type!,
          });
        } else {
          const data = await response.blob();

          setContentInfo({
            content: URL.createObjectURL(data),
            contentType: type!,
          });
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
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          {/* {contentInfo?.contentType === "text/plain" ||
          "application/octet-stream" ? (
            <SyntaxHighlighter
              children={contentInfo?.content?.toString()!}
              showLineNumbers
            />
          ) : ( */}
          <Image
            src={contentInfo?.content as string}
            alt="image"
            layout="fill"
          />
        </div>
      )}
    </div>
  );
}
