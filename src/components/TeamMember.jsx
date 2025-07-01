import { useState } from "react";
import { FaPersonRifle } from "react-icons/fa6";
import MemberDetailsModal from "./MemberDetailsModal";
function TeamMember({}) {
  const [openModal, setOpenModal] = useState(false);

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="m-4">
      <button
        onClick={() => setOpenModal(true)}
        className="w-full"
      >
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
      </button>
      <MemberDetailsModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        member={{
          name: "Masudur",
          role: "React/Next Js dev",
          experience: 3,
          skills: [
            { name: "React", rating: 5 },
            { name: "Next.js", rating: 4 },
            { name: "Tailwind CSS", rating: 4 },
            { name: "Node.js", rating: 3 },
            { name: "TypeScript", rating: 2 },
          ],
        }}
      />
    </div>
  );
}
export default TeamMember;
