import { Logo, SignInButton } from "@/components";
import styles from "./index.module.css";

export const UnauthenticatedContainer = () => {
  return (
    <>
      <main className="UnauthenticatedContainer">
        <div className="UnauthenticatedContainer--Main">
          <Logo className="UnauthenticatedContainer--Main--Logo" />
          <div className="UnauthenticatedContainer--Main--Description">
            Descubra músicas a partir dos seus gostos pessoais
          </div>

          <SignInButton />
        </div>
      </main>

      <style jsx>{`
        .UnauthenticatedContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .UnauthenticatedContainer--Main {
          @media (min-width: 768px) {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          @media (min-width: 640px) {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          padding-left: 1rem;
          padding-right: 1rem;

          max-width: 38rem;
          display: inherit;
          flex-direction: inherit;
          align-items: inherit;
          justify-content: inherit;
        }

        .UnauthenticatedContainer--Main--Logo {
          max-width: 352px;
        }

        .UnauthenticatedContainer--Main--Description {
          display: inherit;
          align-items: inherit;
          flex-direction: inherit;
          gap: 48px;

          margin: 48px 0 24px 0;

          font-weight: 600;
          font-size: 34px;
          line-height: 39px;

          text-align: center;
        }
      `}</style>
    </>
  );
};
