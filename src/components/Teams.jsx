import React, { useState } from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaSquarePersonConfined } from "react-icons/fa6";
import { FaPersonHarassing } from "react-icons/fa6";
import { MdEdit, MdOutlinePersonalVideo } from "react-icons/md";
import SubTeams from "./SubTeams";
import { expertise } from "../data/expertise";
import { useTeams } from "../context/TeamsContext";
import { membersData } from "../data/members";
import { SubTeamsContainer } from "./SubTeamsContainer";
import EditTeamModal from "./EditTeamModal";
import DeleteButton from "./DeleteButton";
function Teams({ teamId }) {
  const { teams, teamDispatch } = useTeams();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const teamInfo = teams.find((team) => team.id === teamId);
  // const teamLeadInfo = expertise.find((member) => member.id === team.teamLead);
  // const teamsInfo = teams.filter((t) => t.parentId === teamId);
  const teamLeadInfo = membersData.find(
    (member) => member.id === teamInfo.teamLead
  );
  const { name, description, stats, subTeamIds } = teamInfo;

  const onClickDelete = () => {
    teamDispatch({
      type: "REMOVE_TEAM",
      payload: {
        id: teamId,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full mb-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center">
              <FaSquarePersonConfined />
              <span className="text-sm ml-1">{stats.members} Members</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-violet-200">{description}</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">
              {" "}
              <FaPersonHarassing />{" "}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-col">
                <span className="font-semibold">{teamLeadInfo.name}</span>
              </div>
              <p className="text-sm">{teamLeadInfo.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm justify-between">
            <div className="flex items-center gap-1">
              <BsPersonPlusFill /> <span> {stats.members} Members</span>
              <MdOutlinePersonalVideo />
              <span className="pr-2">{stats.subTeams} Sub Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditModalOpen(true)}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <MdEdit className="mr-2" />
                Edit Team
              </button>
              <DeleteButton onClick={onClickDelete} />
            </div>
          </div>
        </div>
        <SubTeamsContainer subTeams={subTeamIds} />
        <EditTeamModal
          team={teamInfo}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      </div>
    </div>
  );
}
export default Teams;
