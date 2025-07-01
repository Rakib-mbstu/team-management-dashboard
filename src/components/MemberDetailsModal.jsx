import React from "react";
import { FaStar } from "react-icons/fa";

const skillColors = [
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
];

function MemberDetailsModal({ open, onClose, member }) {
  if (!open || !member) return null;

  // Calculate overall rating percentage
  const totalPossible = member.skills.length * 5;
  const totalStars = member.skills.reduce(
    (sum, skill) => sum + skill.rating,
    0
  );

  const ratingPercent = Math.round((totalStars / totalPossible) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">{member.name}</h2>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="mb-2 text-purple-700 font-medium">{member.role}</div>
        <div className="mb-4">
          <span className="text-sm text-gray-600">Experience: </span>
          <span className="text-sm text-green-700 font-semibold">
            {member.experience} years
          </span>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-700 font-semibold">
              Overall Skill Rating:
            </span>
            <span className="text-blue-700 font-bold">{ratingPercent}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded"
              style={{ width: `${ratingPercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-700 font-semibold mb-2">Skills</div>
          <ul className="space-y-2">
            {member.skills.map((skill, idx) => (
              <li
                key={skill.name}
                className={`flex items-center justify-between px-3 py-2 rounded ${
                  skillColors[idx % skillColors.length]
                }`}
              >
                <span className="font-medium">{skill.name}</span>
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < skill.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-700">
                    {skill.rating}/5
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsModal;
