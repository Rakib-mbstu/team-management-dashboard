import { createContext, useContext, useReducer } from "react";
import { subTeamsData as initialSubTeams } from "../data/subTeams";
import SubTeams from "../components/SubTeams";

export const SubTeamsContext = createContext();

function subTeamsReducer(state, action) {
  switch (action.type) {
    case "ADD_SUB_TEAM":
      return [...state, action.payload];
    case "REMOVE_SUB_TEAM":
      return state.filter((team) => team.id !== action.payload.id);
    default:
      return state;
  }
}

export const SubTeamsProvider = ({ children }) => {
  const [subTeamsData, subTeamDispatch] = useReducer(
    subTeamsReducer,
    initialSubTeams
  );
  return (
    <SubTeamsContext.Provider value={{ subTeamsData, subTeamDispatch }}>
      {children}
    </SubTeamsContext.Provider>
  );
};

export const useSubTeams = () => {
  const context = useContext(SubTeamsContext);
  if (!context) {
    throw new Error("useSubTeams must be used within a SubTeamsProvider");
  }
  return context;
};
