export const LoadingSpinner = () => (
  <>
    <div className="LoadingSpinner" />

    <style jsx>{`
      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      .LoadingSpinner {
        width: 80px;
        height: 80px;
        border: 5px solid #ffffff;
        border-top: 5px solid #141414;
        border-radius: 100%;
        animation: spinner 2.5s linear infinite;
      }
    `}</style>
  </>
);
