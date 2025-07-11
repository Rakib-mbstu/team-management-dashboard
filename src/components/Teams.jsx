import React from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaSquarePersonConfined } from "react-icons/fa6";
import { FaPersonHarassing } from "react-icons/fa6";
import { MdOutlinePersonalVideo } from "react-icons/md";
import SubTeams from "./SubTeams";
import { expertise } from "../data/expertise";
import { useTeams } from "../context/TeamsContext";
import { membersData } from "../data/members";
import { SubTeamsContainer } from "./SubTeamsContainer";
function Teams({ teamId }) {
  const { teams } = useTeams();
  console.log("Teams component rendered with teamId:", JSON.stringify(teams));

  const teamInfo = teams.find((team) => team.id === teamId);
  // const teamLeadInfo = expertise.find((member) => member.id === team.teamLead);
  // const teamsInfo = teams.filter((t) => t.parentId === teamId);
  const teamLeadInfo = membersData.find(
    (member) => member.id === teamInfo.teamLead
  );
  const { name, description, stats, subTeamIds } = teamInfo;

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
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <BsPersonPlusFill /> <span> {stats.members} Members</span>
              <MdOutlinePersonalVideo />
              <span className="pr-2">{stats.subTeams} Sub Teams</span>
            </div>
          </div>
        </div>
        <SubTeamsContainer subTeams={subTeamIds} />
      </div>
    </div>
  );
}
export default Teams;
