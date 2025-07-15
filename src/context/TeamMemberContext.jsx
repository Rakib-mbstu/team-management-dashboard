import { createContext, useContext } from "react";

import { membersData } from "../data/members";
import TeamMember from "../components/TeamMember";
import { skills } from "../data/skills";

export const TeamMemberContext = createContext();
export const skillsData = createContext(skills);

export const TeamMemberProvider = ({ children }) => {
  return (
    <TeamMemberContext.Provider value={{ membersData }}>
      {children}
    </TeamMemberContext.Provider>
  );
};

const SkillDataProvider = ({ children }) => {
  return (
    <skillsData.Provider value={{ skills }}>{children}</skillsData.Provider>
  );
};

export const TeamMemberContainer = ({ teamMembers }) => {
  const memberInfo = membersData.filter((member) =>
    teamMembers.includes(member.id)
  );
  if (memberInfo.length === 0) {
    return <p className="text-gray-500">No team members found.</p>;
  }
  const memberInfoWithSkills = memberInfo.map((member) => {
    const memberSkills = skills.find((skill) => member.id === skill.memberId);
    return {
      ...member,
      skills: memberSkills.skills || [],
    };
  });

  return (
    <SkillDataProvider>
      {memberInfoWithSkills.map((member) => (
        <TeamMember
          key={member.id}
          {...member}
        />
      ))}
    </SkillDataProvider>
  );
};

export const useTeamMember = () => {
  return useContext(TeamMemberContext);
};
