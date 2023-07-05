"use client";

import { LoadingSpinner } from "@/components";
import { AuthenticatedContainer, UnauthenticatedContainer } from "@/containers";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    console.log("foo", session);
  }, [session]);

  switch (session.status) {
    case "authenticated":
      return <AuthenticatedContainer />;
    case "unauthenticated":
      return <UnauthenticatedContainer />;
    default:
      return <LoadingSpinner />;
  }
}
