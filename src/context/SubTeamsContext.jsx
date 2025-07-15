import { createContext, useContext, useReducer } from "react";
import { subTeamsData as initialSubTeams } from "../data/subTeams";
import SubTeams from "../components/SubTeams";

export const SubTeamsContext = createContext();

function subTeamsReducer(state, action) {
  switch (action.type) {
    case "ADD_SUB_TEAM":
      return [...state, action.payload];
    case "DELETE_SUB_TEAM":
      return state.filter((team) => team.id !== action.payload.id);
    case "UPDATE_SUB_TEAM": {
      const exists = state.some((team) => team.id === action.payload.id);
      if (exists) {
        return state.map((team) =>
          team.id === action.payload.id ? { ...team, ...action.payload } : team
        );
      } else {
        return [...state, action.payload];
      }
    }
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
