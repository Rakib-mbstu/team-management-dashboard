import { useState } from "react";
import { FaPersonRifle } from "react-icons/fa6";
import MemberDetailsModal from "./MemberDetailsModal";

function TeamMember({ name, role, experience, skills, status }) {
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
                <div className="font-medium">{name}</div>
                <div className="text-gray-600">{role}</div>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs mt-1 ${getStatusColor(
                  status
                )}`}
              >
                {status}
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
          name: name,
          role: role,
          experience: experience,
          skills: skills,
        }}
      />
    </div>
  );
}
export default TeamMember;
