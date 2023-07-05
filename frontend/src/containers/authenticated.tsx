"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { BackButton, LoadingSpinner, PlaylistCard } from "@/components";
import { useSpotify } from "@/context";
import { gray1, gray2, gray3 } from "@/support/colors";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { rem } from "polished";
import { useEffect, useState } from "react";
import background from "../assets/background.jpg";

export const AuthenticatedContainer = () => {
  const { playlists, fetchPlaylists, fetchPlaylist, tracks } = useSpotify();
  const [isLoading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Buscando playlists...");

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    setLoading(!playlists);
    setLoadingText("Buscando playlists...");
  }, [setLoading, playlists]);

  useEffect(() => {
    setLoading(!tracks);
    setLoadingText("Gerando playlist...");
  }, [setLoading, tracks]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const getTracks = (playlistId: string) => {
    setLoading(true);
    setLoadingText("Gerando playlist...");
    fetchPlaylist(playlistId);
  };

  return (
    <>
      <main className="AuthenticatedContainer">
        <div className="AuthenticatedContainer--Main">
          <div>
            <BackButton onClick={() => signOut()} />

            <h1 className="AuthenticatedContainer--Title">
              Escolha uma playlist
            </h1>
            <span className="AuthenticatedContainer--Description">
              Aqui estão todas as suas playlists do Spotify. Escolha uma para
              recomendarmos mais músicas.
            </span>
          </div>

          {isLoading && (
            <div className="AuthenticatedContainer--Loading">
              <LoadingSpinner />
              <div className="AuthenticatedContainer--Loading--Title">
                {loadingText}
              </div>
            </div>
          )}

          {!isLoading && tracks.length === 0 && (
            <div className="AuthenticatedContainer--Playlists">
              {playlists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => getTracks(playlist.id)}
                >
                  <PlaylistCard
                    name={playlist?.name}
                    image={playlist?.images?.[0].url}
                    size={`${playlist?.tracks?.total} músicas`}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && tracks.length > 0 && (
            <div className="AuthenticatedContainer--Tracks">
              {tracks.map((track) => (
                <PlaylistCard
                  key={track.name}
                  name={track?.name}
                  image={track?.image}
                  size={track.artists.join(", ")}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .AuthenticatedContainer {
          background-image: url(${background.src});
          background-repeat: no-repeat;
          background-size: cover;

          height: 100vh;
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .AuthenticatedContainer--Main {
          padding-left: ${rem(64)};
          padding-right: ${rem(64)};
          padding-top: ${rem(64)};
          padding-bottom: ${rem(48)};

          max-width: ${rem(608)};
          height: 100vh;
          box-sizing: border-box;

          background-color: ${gray3};

          display: flex;
          flex-direction: column;
        }

        .AuthenticatedContainer--Title {
          margin-top: ${rem(40)};
          font-weight: 600;
          font-size: ${rem(30)};
        }

        .AuthenticatedContainer--Description {
          font-weight: 400;
          font-size: ${rem(16)};
        }

        .AuthenticatedContainer--Playlists,
        .AuthenticatedContainer--Tracks {
          flex-grow: 1;
          box-sizing: border-box;
          overflow: auto;

          display: flex;
          flex-direction: column;
          gap: ${rem(16)};

          margin-top: ${rem(32)};
          padding-right: ${rem(8)};
        }

        .AuthenticatedContainer--Playlists::-webkit-scrollbar,
        .AuthenticatedContainer--Tracks::-webkit-scrollbar {
          width: ${rem(16)};
        }

        .AuthenticatedContainer--Playlists::-webkit-scrollbar-track,
        .AuthenticatedContainer--Tracks::-webkit-scrollbar-track {
          background-color: ${gray1};
          border-radius: ${rem(100)};
        }

        .AuthenticatedContainer--Playlists::-webkit-scrollbar-thumb,
        .AuthenticatedContainer--Tracks::-webkit-scrollbar-thumb {
          background-color: ${gray2};
          border-radius: ${rem(100)};
        }

        .AuthenticatedContainer--Loading {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .AuthenticatedContainer--Loading--Title {
          margin-top: ${rem(24)};
          font-weight: 600;
          font-size: ${rem(24)};
        }
      `}</style>
    </>
  );
};
