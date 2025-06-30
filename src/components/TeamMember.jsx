import { FaPersonRifle } from "react-icons/fa6";
function TeamMember({}) {
  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };
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
            <span
              className={`px-2 py-1 rounded text-xs mt-1 ${getStatusColor(
                "active"
              )}`}
            >
              {"active"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeamMember;
