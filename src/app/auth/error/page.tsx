"use client";

import { ErrorCard } from "@/components/auth/error-card";

export default function AuthErrorPage() {
  return (
    <div className="container h-[90vh] flex justify-center items-center">
      <ErrorCard />
    </div>
  );
}
