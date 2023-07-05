import { Playlist } from "@/types";
import axios from "axios";
import { createContext, useContext, useState } from "react";

type Track = {
  image: string;
  artists: string[];
  name: string;
};

type ContextProps = {
  playlists: Playlist[];
  fetchPlaylists: () => void;
  tracks: Track[];
  fetchPlaylist: (playlistId: string) => void;
};

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const fetchPlaylists = async () => {
    try {
      const { data } = await axios.get("/api/playlists");

      console.log(data);

      setPlaylists(data.response);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlaylist = async (playlistId: string) => {
    try {
      const { data } = await axios.get(
        `/api/playlist?playlist_id='${playlistId}`
      );

      setTracks(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SpotifyContext.Provider
      value={{ playlists, fetchPlaylists, tracks, fetchPlaylist }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);
