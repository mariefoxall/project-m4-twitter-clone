import React from "react";
import ErrorScreen from "./ErrorScreen";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentUserProfile, setCurrentUserProfile] = React.useState({});
  const [status, setStatus] = React.useState("loading");
  const [serverError, setServerError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    fetch("/api/me/profile")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentUser(data.profile.handle);
        setCurrentUserProfile(data.profile);
        setStatus("idle");
        setServerError(false);
      })
      .catch((err) => {
        console.log("something's wrong, dummy!", err);
        setServerError(true);
        setErrorMessage("Please refresh the page to try again.");
      });
  }, []);

  return (
    <>
      {serverError === true ? (
        <ErrorScreen message={errorMessage} />
      ) : (
        <CurrentUserContext.Provider
          value={{
            currentUser,
            status,
            currentUserProfile,
            serverError,
            setServerError,
          }}
        >
          {children}
        </CurrentUserContext.Provider>
      )}
    </>
  );
};
