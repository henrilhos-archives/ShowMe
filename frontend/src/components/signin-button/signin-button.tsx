import { SpotifyLogo } from "@/components";
import { green } from "@/support/colors";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { rem } from "polished";

export const SignInButton = () => {
  return (
    <>
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => signIn("spotify")}>
        <div className="SignInButton">
          <SpotifyLogo />
          Continuar com Spotify
        </div>
      </motion.div>
      <style jsx>{`
        .SignInButton {
          height: ${rem(48)};

          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${rem(8)};

          background-color: ${green};
          padding: 0 ${rem(24)} 0 ${rem(16)};
          border-radius: ${rem(6)};

          cursor: pointer;
          user-select: none;
        }
      `}</style>
    </>
  );
};
