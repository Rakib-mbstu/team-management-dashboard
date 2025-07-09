import { createContext, useContext } from "react";
import { subTeamsData } from "../data/subTeams";
import SubTeams from "../components/SubTeams";

export const SubTeamsContext = createContext();

export const SubTeamsProvider = ({ children }) => {
  return (
    <SubTeamsContext.Provider value={subTeamsData}>
      {children}
    </SubTeamsContext.Provider>
  );
};
export const SubTeamsContainer = ({ subTeams }) => {
  const subTeamsInfo = subTeamsData.filter((subTeam) =>
    subTeams.includes(subTeam.id)
  );
  return (
    <SubTeamsProvider>
      {subTeamsInfo.map((subTeam) => (
        <SubTeams
          key={subTeam.id}
          {...subTeam}
        />
      ))}
    </SubTeamsProvider>
  );
};
export const useSubTeams = () => {
  const context = useContext(SubTeamsContext);
  if (!context) {
    throw new Error("useSubTeams must be used within a SubTeamsProvider");
  }
  return context;
};
