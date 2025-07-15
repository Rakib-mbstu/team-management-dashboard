import { createContext, useContext, useReducer } from "react";
import { teams as initialTeams } from "../data/teams";

export const TeamsContext = createContext();

function teamsReducer(state, action) {
  switch (action.type) {
    case "ADD_TEAM":
      return [...state, action.payload];
    case "UPDATE_TEAM":
      return state.map((team) =>
        team.id === action.payload.id ? { ...team, ...action.payload } : team
      );
    case "REMOVE_TEAM":
      return state.filter((team) => team.id !== action.payload.id);
    default:
      return state;
  }
}

export const TeamsProvider = ({ children }) => {
  const [teams, teamDispatch] = useReducer(teamsReducer, initialTeams);
  return (
    <TeamsContext.Provider value={{ teams, teamDispatch }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeams must be used within a TeamsProvider");
  }
  return context;
};
