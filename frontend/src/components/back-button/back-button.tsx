import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: Props) => {
  return (
    <motion.svg
      onClick={() => onClick()}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      width="19"
      height="33"
      viewBox="0 0 19 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.695663 18.1642C-0.23189 17.2437 -0.23189 15.7489 0.695663 14.8285L14.9429 0.690338C15.8704 -0.230114 17.3768 -0.230114 18.3043 0.690338C19.2319 1.61079 19.2319 3.1056 18.3043 4.02605L5.73413 16.5L18.2969 28.9739C19.2245 29.8944 19.2245 31.3892 18.2969 32.3097C17.3694 33.2301 15.863 33.2301 14.9355 32.3097L0.688244 18.1715L0.695663 18.1642Z"
        fill="white"
      />
    </motion.svg>
  );
};
