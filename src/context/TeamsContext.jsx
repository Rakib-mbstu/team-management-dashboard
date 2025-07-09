import { createContext, useContext } from "react";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children, teams }) => {
  return (
    <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
  );
};
