import { createContext, useContext, useReducer } from "react";

import { membersData as initialMembers } from "../data/members";
import { skills as initialSkills } from "../data/skills";

export const TeamMemberContext = createContext();
export const SkillsData = createContext();

function memberReducer(state, action) {
  switch (action.type) {
    case "ADD_MEMBER":
      return [...state, action.payload];
    case "UPDATE_MEMBER":
      return state.map((member) =>
        member.id === action.payload.id
          ? { ...member, ...action.payload }
          : member
      );
    case "REMOVE_MEMBER":
      return state.filter((member) => member.id !== action.payload.id);
    default:
      return state;
  }
}

function skillReducer(state, action) {
  switch (action.type) {
    case "ADD_SKILLS":
      return [
        ...state,
        { memberId: action.payload.memberId, skills: action.payload.skills },
      ];
    case "UPDATE_SKILLS":
      return state.map((entry) =>
        entry.memberId === action.payload.memberId
          ? { ...entry, skills: action.payload.skills }
          : entry
      );
    case "REMOVE_SKILLS":
      return state.filter(
        (entry) => entry.memberId !== action.payload.memberId
      );
    default:
      return state;
  }
}

export const TeamMemberProvider = ({ children }) => {
  const [membersData, memberDispatch] = useReducer(
    memberReducer,
    initialMembers
  );
  return (
    <TeamMemberContext.Provider value={{ membersData, memberDispatch }}>
      {children}
    </TeamMemberContext.Provider>
  );
};

export const SkillDataProvider = ({ children }) => {
  const [skills, skillDispatch] = useReducer(skillReducer, initialSkills);
  return (
    <SkillsData.Provider value={{ skills, skillDispatch }}>
      {children}
    </SkillsData.Provider>
  );
};

export const useTeamMember = () => {
  return useContext(TeamMemberContext);
};

export const useSkills = () => {
  return useContext(SkillsData);
};
