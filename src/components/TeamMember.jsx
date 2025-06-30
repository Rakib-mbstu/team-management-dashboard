import { FaPersonRifle } from "react-icons/fa6";
function TeamMember({}) {
  return (
    <div className="m-4">
      <div className="flex flex-wrap gap-2 justify-start">
        <div className="flex items-start gap-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-300 cursor-pointer">
          <div className="flex items-start gap-2">
            <span className="text-sm mt-2">
              <FaPersonRifle />
            </span>
            <div className="flex flex-col items-start text-xs">
              <div className="font-medium">Masudur</div>
              <div className="text-gray-600">React/Next Js dev</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeamMember;
