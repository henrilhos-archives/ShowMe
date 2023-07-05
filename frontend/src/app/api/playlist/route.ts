import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PlaylistItem } from "@/types";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const playlistId = request.nextUrl.searchParams.get("playlist_id");
  const fields = "items(track(artists(id,name),id,name,popularity))";

  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=${fields}&limit=50`;

  let response: PlaylistItem[] = [];

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

  // @ts-ignore
  const tracks = await getTracks(response, session.user.accessToken);

  const foo = await fetch("http://localhost:5000/predict", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(tracks),
  });
  const playlistJSON = await foo.json();

  return NextResponse.json(playlistJSON);
}

const getTracks = async (
  playlistItems: PlaylistItem[],
  accessToken: string
) => {
  let tracks = [];
  for (const key in playlistItems) {
    if (Object.prototype.hasOwnProperty.call(playlistItems, key)) {
      const item = playlistItems[key];

      // @ts-ignore
      const track = await processTrack(item, accessToken);
      tracks.push(track);
    }
  }
  return tracks;
};

const processTrack = async (item: PlaylistItem, accessToken: string) => {
  const { track } = item;
  const features = await getFeatures(track.id, accessToken);
  const artist = await getArtist(track.artists[0].id, accessToken);

  return {
    artist_name: track.artists[0].name,
    track_name: track.name,
    track_url: track.id,
    artist_url: track.artists[0].id,
    track_popularity: track.popularity,
    ...features,
    ...artist,
  };
};

const getFeatures = async (trackId: string, accessToken: string) => {
  const featuresURL = `https://api.spotify.com/v1/audio-features/${trackId}`;
  const features = await fetch(featuresURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const featuresJSON = await features.json();

  return featuresJSON;
};

const getArtist = async (artistId: string, accessToken: string) => {
  const artistURL = `https://api.spotify.com/v1/artists/${artistId}`;
  const artist = await fetch(artistURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const artistJSON = await artist.json();

  return {
    artist_popularity: artistJSON.popularity,
    genres: artistJSON.genres.map((s: string) => s.replace(" ", "_")).join(" "),
  };
};
