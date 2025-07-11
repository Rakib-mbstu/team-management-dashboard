import React, { useState } from "react";
import { membersData } from "../data/members";
import { FaCheck, FaPlus, FaTeamspeak, FaUser, FaXing } from "react-icons/fa6";
import { useTeams } from "../context/TeamsContext";
import { useTeamMember } from "../context/TeamMemberContext";

const AddTeamModal = () => {
  const availableMembers = membersData;
  const { dispatch } = useTeams();
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamLead, setTeamLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = availableMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMember = (member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.find((m) => m.id === member.id);
      if (isSelected) {
        if (teamLead && teamLead.id === member.id) {
          setTeamLead(null);
        }
        return prev.filter((m) => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleSubmit = () => {
    if (teamName.trim() && selectedMembers.length > 0) {
      const newTeam = {
        name: teamName,
        description: description,
        members: selectedMembers.map((member) => member.id),
        subTeamIds: [],
        stats: {
          members: selectedMembers.length,
          subTeams: 0,
        },
        membersCount: selectedMembers.length,
        id: Date.now(),
        teamLead: teamLead.id,
      };
      dispatch({ type: "ADD_TEAM", payload: newTeam });
      console.log("New team created:", newTeam);
      setTeamName("");
      setDescription("");
      setSelectedMembers([]);
      setTeamLead(null);
      setSearchQuery("");
      setIsOpen(false);
      alert("Team created successfully!");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTeamName("");
    setDescription("");
    setSelectedMembers([]);
    setTeamLead(null);
    setSearchQuery("");
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
      >
        <FaPlus size={20} />
        Add New Team
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-grey-500 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
            style={{
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {/* <Users className="w-5 h-5 text-blue-600" /> */}
                  <FaTeamspeak className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Team
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {/* <X size={24} /> */}
                <FaXing size={24} />
              </button>
            </div>

            {/* Form */}
            <div
              className="p-6 space-y-6 overflow-y-auto"
              style={{ flex: 1, minHeight: 0 }}
            >
              {/* Team Name */}
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Team Name *
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter team name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter team description"
                />
              </div>

              {/* Members Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Team Members * ({selectedMembers.length} selected)
                </label>

                {/* Search Members */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search members by name, email, or role..."
                  />
                </div>

                {/* Members List */}
                <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  {filteredMembers.map((member) => {
                    const isSelected = selectedMembers.find(
                      (m) => m.id === member.id
                    );
                    return (
                      <div
                        key={member.id}
                        onClick={() => toggleMember(member)}
                        className={`p-3 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {/* {isSelected && (
                                <Check
                                  size={14}
                                  className="text-white"
                                />
                              )} */}
                              <FaCheck
                                size={14}
                                className="text-white"
                              />
                            </div>
                            <div>
                              <div className="font-[400] text-gray-900">
                                {member.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.experience} years of experience
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No members found matching your search.
                  </div>
                )}
              </div>

              {/* Team Lead Selection */}
              {selectedMembers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Team Lead
                  </label>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="space-y-2">
                      {selectedMembers.map((member) => (
                        <label
                          key={member.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="teamLead"
                            checked={teamLead && teamLead.id === member.id}
                            onChange={() => setTeamLead(member)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex items-center justify-between flex-1">
                            <div>
                              <div className="font-medium text-gray-900">
                                {member.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.experience} years of experience
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.role}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Members Summary */}
              {selectedMembers.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Selected Members:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => (
                      <span
                        key={member.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          teamLead && teamLead.id === member.id
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {member.name}
                        {teamLead && teamLead.id === member.id && (
                          <span className="ml-1 text-xs">(Lead)</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!teamName.trim() || selectedMembers.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeamModal;
