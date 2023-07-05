import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Playlist } from "@/types";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  let response: Playlist[] = [];
  let url = "https://api.spotify.com/v1/me/playlists?limit=50";

  while (url) {
    const res = await fetch(url, {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    const json = await res.json();

    response = response.concat(json.items);
    url = json.next;
  }

  return NextResponse.json({ response });
}
