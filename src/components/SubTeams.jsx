import { FaPersonHarassing } from "react-icons/fa6";
import { membersData } from "../data/members";
import { TeamMemberContainer } from "../context/TeamMemberContext";

function SubTeams({ name, lead, membersCount, members }) {
  const teamLead = membersData.find((member) => member.id === lead);
  return (
    <div className="border-[1.5px] border-violet-500 rounded-lg m-4 p-4 hover:bg-gray-50 gap-1">
      <div className="flex text-violet-500 font-semibold flex-start m-2">
        {name}
      </div>
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">
          {" "}
          <FaPersonHarassing />{" "}
        </span>
        <div className="flex flex-col">
          <span className="text-lg">{teamLead.name}</span>
          <p className="text-sm">{teamLead.role}</p>
        </div>
        <span className="ml-auto text-sm text-gray-500">
          {membersCount} members
        </span>
      </div>
      <div className="flex flex-wrap">
        {/* {memberInfo.map((member) => {
          return (
            <TeamMember
              key={member.id}
              {...member}
            />
          );
        })} */}
        <TeamMemberContainer teamMembers={members} />
      </div>
    </div>
  );
}

export default SubTeams;
