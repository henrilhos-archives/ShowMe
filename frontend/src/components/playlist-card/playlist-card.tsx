/* eslint-disable @next/next/no-img-element */

import { gray1 } from "@/support/colors";
import { rem } from "polished";

type Props = {
  name: string;
  image?: string;
  size?: string;
};

export const PlaylistCard = ({ name, image, size }: Props) => {
  return (
    <>
      <div className="Card">
        <img className="Card--Image" src={image || ""} alt="Foo" />
        <div className="Card--Content">
          <div className="Card--Title">{name}</div>
          <div className="Card--Subtitle">{size}</div>
        </div>
      </div>
      <style jsx>{`
        .Card {
          background-color: ${gray1};
          padding: ${rem(12)} ${rem(16)};
          border-radius: ${rem(10)};

          display: flex;
          flex-direction: row;
          gap: ${rem(24)};
          align-items: center;

          cursor: pointer;
        }

        .Card--Image {
          width: ${rem(72)};
          height: ${rem(72)};
          border-radius: ${rem(10)};
          object-fit: cover;
          object-position: center;
        }

        .Card--Content {
          width: calc(100% - ${rem(96)});
          display: flex;
          flex-direction: column;
        }

        .Card--Title {
          font-weight: 600;
          font-size: ${rem(20)};
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .Card--Subtitle {
          font-weight: 400;
          font-size: ${rem(12)};
        }
      `}</style>
    </>
  );
};
