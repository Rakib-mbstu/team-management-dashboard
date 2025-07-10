import { createContext, useContext } from "react";
import Teams from "../components/Teams";
import teams from "../data/teams";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  return (
    <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
  );
};

export const TeamsContainer = ({ children }) => {
  return (
    <TeamsProvider>
      {teams.map((team) => (
        <Teams
          key={team.id}
          teamId={team.id}
        />
      ))}
    </TeamsProvider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeams must be used within a TeamsProvider");
  }
  return context;
};
