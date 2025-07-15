import { TeamsProvider, useTeams } from "../context/TeamsContext";
import Teams from "../components/Teams";
import AddTeamModal from "./AddTeamModal";
import { SubTeamsProvider } from "../context/SubTeamsContext";
import {
  SkillDataProvider,
  TeamMemberProvider,
} from "../context/TeamMemberContext";
import MemberFormModal from "./MemberFormModal";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

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

const AddNewMemberButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="my-4 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
      onClick={() => onClick()}
    >
      <FaPlus size={20} />
      Add New Member
    </button>
  );
};

export const TeamsContainer = () => {
  const [openMemberModal, setOpenMemberModal] = useState(false);
  return (
    <TeamsProvider>
      <SubTeamsProvider>
        <TeamMemberProvider>
          <SkillDataProvider>
            <div className="flex flex-col justify-between items-end mb-8">
              <AddTeamModal />
              <AddNewMemberButton onClick={() => setOpenMemberModal(true)} />
              <MemberFormModal
                open={openMemberModal}
                onClose={() => setOpenMemberModal(false)}
              />
            </div>
            <TeamsList />
          </SkillDataProvider>
        </TeamMemberProvider>
      </SubTeamsProvider>
    </TeamsProvider>
  );
};
export default TeamsContainer;
