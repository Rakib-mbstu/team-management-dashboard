import { TeamsProvider, useTeams } from "../context/TeamsContext";
import Teams from "../components/Teams";
import AddTeamModal from "./AddTeamModal";
import { SubTeamsProvider } from "../context/SubTeamsContext";

const TeamsList = () => {
  const { teams } = useTeams();

  return (
    <>
      {teams.map((team) => (
        <Teams
          key={team.id}
          teamId={team.id}
        />
      ))}
    </>
  );
};

export const TeamsContainer = () => {
  return (
    <TeamsProvider>
      <SubTeamsProvider>
        <div className="flex flex-col justify-between items-end mb-8">
          <AddTeamModal />
        </div>
        <TeamsList />
      </SubTeamsProvider>
    </TeamsProvider>
  );
};
export default TeamsContainer;
