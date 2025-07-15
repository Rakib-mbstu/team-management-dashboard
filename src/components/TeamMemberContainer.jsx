import {
  SkillDataProvider,
  useSkills,
  useTeamMember,
} from "../context/TeamMemberContext";
import TeamMember from "./TeamMember";

export const TeamMemberContainer = ({ teamMembers }) => {
  const { membersData } = useTeamMember();
  const { skills } = useSkills();
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
    <>
      {memberInfoWithSkills.map((member) => (
        <TeamMember
          key={member.id}
          {...member}
        />
      ))}
    </>
  );
};
