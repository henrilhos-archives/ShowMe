"use client";

import { SpotifyProvider } from "@/context";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <SpotifyProvider>{children}</SpotifyProvider>
    </SessionProvider>
  );
}
