import { createContext } from "react";

import { members } from "../data/members";

export const TeamMemberContext = createContext();

export const TeamMemberProvider = ({ children }) => {
  return (
    <TeamMemberContext.Provider value={{ members }}>
      {children}
    </TeamMemberContext.Provider>
  );
};

export const TeamMemberContainer = ({ children }) => {
  return <TeamMemberProvider>{children}</TeamMemberProvider>;
};

export const useTeamMember = () => {
  return useContext(TeamMemberContext);
};
