import { useState, useEffect } from "react";
import { useSkills, useTeamMember } from "../context/TeamMemberContext";
import { skills as allSkills } from "../data/skills";

const skillOptions = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "CSS",
  "HTML",
  "JavaScript",
  "MongoDB",
  "SQL",
  "Flutter",
  "Swift",
  "Android",
  "AWS",
  "Docker",
  "REST API",
  "Manual Testing",
  "Bug Reporting",
  "Figma",
  "Sketch",
  "Sales",
  "CRM",
];

export default function MemberFormModal({ open, onClose, editMember }) {
  const { membersData, memberDispatch } = useTeamMember();
  const { skillDispatch } = useSkills();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(0);
  const [status, setStatus] = useState("active");
  const [skills, setSkills] = useState([{ name: "", rating: 1 }]);

  // Populate form if editing
  useEffect(() => {
    if (editMember) {
      setName(editMember.name || "");
      setRole(editMember.role || "");
      setExperience(editMember.experience || 0);
      setStatus(editMember.status || "active");
      setSkills(
        editMember.skills && editMember.skills.length > 0
          ? editMember.skills
          : [{ name: "", rating: 1 }]
      );
    } else {
      setName("");
      setRole("");
      setExperience(0);
      setStatus("active");
      setSkills([{ name: "", rating: 1 }]);
    }
  }, [editMember, open]);

  const handleSkillChange = (idx, field, value) => {
    setSkills((skills) =>
      skills.map((skill, i) =>
        i === idx ? { ...skill, [field]: value } : skill
      )
    );
  };

  const addSkill = () => setSkills([...skills, { name: "", rating: 1 }]);
  const removeSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberPayload = {
      id: editMember ? editMember.id : Date.now(),
      name,
      role,
      experience: Number(experience),
      status,
      skills: skills.filter((s) => s.name.trim()),
    };
    memberDispatch({
      type: editMember ? "UPDATE_MEMBER" : "ADD_MEMBER",
      payload: memberPayload,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editMember ? "Edit Member" : "Add Member"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role *</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              min={0}
              className="w-full border px-3 py-2 rounded"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex gap-2 mb-2"
              >
                <select
                  className="border px-2 py-1 rounded flex-1"
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(idx, "name", e.target.value)
                  }
                  required
                >
                  <option value="">Select skill</option>
                  {skillOptions.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="border px-2 py-1 rounded w-16"
                  value={skill.rating}
                  onChange={(e) =>
                    handleSkillChange(idx, "rating", Number(e.target.value))
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="text-red-500 hover:text-red-700 px-2"
                  disabled={skills.length === 1}
                  title="Remove skill"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              + Add Skill
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editMember ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
