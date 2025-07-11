import { SubTeamsProvider, useSubTeams } from "../context/SubTeamsContext";
import SubTeams from "./SubTeams";

const SubTeamsList = ({ subTeams }) => {
  const { subTeamsData } = useSubTeams();
  const subTeamsInfo = subTeamsData.filter((subTeam) =>
    subTeams.includes(subTeam.id)
  );
  return (
    <div className="grid grid-cols-1 gap-6 w-full mb-2">
      {subTeamsInfo.map((subTeam) => (
        <SubTeams
          key={subTeam.id}
          {...subTeam}
        />
      ))}
    </div>
  );
};
export const SubTeamsContainer = ({ subTeams }) => {
  return <SubTeamsList subTeams={subTeams} />;
};
