import { FaPersonHarassing } from "react-icons/fa6";
import TeamMember from "./TeamMember";

function SubTeams() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex text-violet-500 font-semibold flex-start m-2">
        FrontEnd Team
      </div>
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">
          {" "}
          <FaPersonHarassing />{" "}
        </span>
        <div className="flex flex-col">
          <span className="text-lg">Faki bro</span>
          <p className="text-sm">Team lead</p>
        </div>
        <span className="ml-auto text-sm text-gray-500">5 members</span>
      </div>
      <div>
        <TeamMember />
        <TeamMember />
        <TeamMember />
        <TeamMember />
      </div>
    </div>
  );
}

export default SubTeams;
