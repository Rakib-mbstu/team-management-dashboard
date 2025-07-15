import React, { useState, useEffect } from "react";
import { membersData } from "../data/members";
import { useTeams } from "../context/TeamsContext";
import { MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaCheck, FaMinus, FaPlus, FaUsers } from "react-icons/fa6";
import { useTeamMember } from "../context/TeamMemberContext";
import { useSubTeams } from "../context/SubTeamsContext";

const EditTeamModal = ({ team, isOpen, onClose }) => {
  const { membersData: availableMembers } = useTeamMember();
  const { subTeamsData, subTeamDispatch } = useSubTeams();
  const { teamDispatch } = useTeams();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamLead, setTeamLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subTeams, setSubTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("main");

  // Initialize form with existing team data
  useEffect(() => {
    if (team && isOpen) {
      setTeamName(team.name || "");
      setDescription(team.description || "");

      // Set main team members
      const existingSubTeams = subTeamsData.filter((subTeam) =>
        team.subTeamIds.includes(subTeam.id)
      );
      const memberIds = existingSubTeams.flatMap((subTeam) => subTeam.members);
      const mainMembers = availableMembers.filter((member) =>
        memberIds.includes(member.id)
      );

      // Set team lead
      const lead = team.teamLead
        ? availableMembers.find((member) => member.id === team.teamLead)
        : null;
      const updatedMembers = lead ? [...mainMembers, lead] : mainMembers;
      setSelectedMembers(updatedMembers);
      setTeamLead(lead);

      // Set sub-teams
      const populatedSubTeams = existingSubTeams.map((subTeam) => ({
        id: subTeam.id,
        name: subTeam.name,
        description: subTeam.description || "",
        members: subTeam.members
          ? availableMembers.filter((member) =>
              subTeam.members.includes(member.id)
            )
          : [],
        subTeamLead: subTeam.lead
          ? availableMembers.find((member) => member.id === subTeam.lead)
          : null,
      }));
      setSubTeams(populatedSubTeams);
    }
  }, [team, isOpen, availableMembers]);

  const filteredMembers = availableMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvailableMembersForSubTeam = (currentSubTeamIndex = -1) => {
    const mainTeamMemberIds = selectedMembers.map((m) => m.id);
    const otherSubTeamMemberIds = subTeams
      .filter((_, index) => index !== currentSubTeamIndex)
      .flatMap((subTeam) => subTeam.members.map((m) => m.id));

    const assignedMemberIds = [...mainTeamMemberIds, ...otherSubTeamMemberIds];

    return availableMembers.filter(
      (member) =>
        !assignedMemberIds.includes(member.id) &&
        (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const toggleMember = (member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.find((m) => m.id === member.id);
      if (isSelected) {
        if (teamLead && teamLead === member.id) {
          setTeamLead(null);
        }
        return prev.filter((m) => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const addSubTeam = () => {
    const newSubTeam = {
      id: Date.now(),
      name: "",
      description: "",
      members: [],
      subTeamLead: null,
    };
    setSubTeams([...subTeams, newSubTeam]);
  };

  const removeSubTeam = (index) => {
    setSubTeams(subTeams.filter((_, i) => i !== index));
  };

  const updateSubTeam = (index, field, value) => {
    setSubTeams(
      subTeams.map((subTeam, i) =>
        i === index ? { ...subTeam, [field]: value } : subTeam
      )
    );
  };

  const toggleSubTeamMember = (subTeamIndex, member) => {
    setSubTeams(
      subTeams.map((subTeam, i) => {
        if (i === subTeamIndex) {
          const isSelected = subTeam.members.find((m) => m.id === member.id);
          if (isSelected) {
            const newMembers = subTeam.members.filter(
              (m) => m.id !== member.id
            );
            const newLead =
              subTeam.subTeamLead && subTeam.subTeamLead.id === member.id
                ? null
                : subTeam.subTeamLead;
            return { ...subTeam, members: newMembers, subTeamLead: newLead };
          } else {
            return { ...subTeam, members: [...subTeam.members, member] };
          }
        }
        return subTeam;
      })
    );
  };

  const setSubTeamLead = (subTeamIndex, member) => {
    setSubTeams(
      subTeams.map((subTeam, i) =>
        i === subTeamIndex ? { ...subTeam, subTeamLead: member } : subTeam
      )
    );
  };

  const handleSubmit = () => {
    if (teamName.trim() && selectedMembers.length > 0) {
      const validSubTeams = subTeams.filter(
        (subTeam) => subTeam.name.trim() && subTeam.members.length > 0
      );

      const updatedTeam = {
        ...team,
        name: teamName,
        description: description,
        subTeamIds: validSubTeams.map((subTeam) => subTeam.id),
        stats: {
          members: selectedMembers.length,
          subTeams: validSubTeams.length,
        },
        membersCount: selectedMembers.length,
        teamLead: teamLead ? teamLead.id : null,
      };

      teamDispatch({ type: "UPDATE_TEAM", payload: updatedTeam });
      validSubTeams.map((subTeam) => {
        subTeamDispatch({
          type: "UPDATE_SUB_TEAM",
          payload: {
            id: subTeam.id,
            name: subTeam.name,
            lead: subTeam.subTeamLead.id,
            membersCount: subTeam.membersCount,
            members: subTeam.members.map((member) => member.id),
          },
        });
      });
      handleClose();
      alert("Team updated successfully!");
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setActiveTab("main");
    onClose();
  };

  const getTotalMembers = () => {
    const mainTeamCount = selectedMembers.length;
    const subTeamCount = subTeams.reduce(
      (total, subTeam) => total + subTeam.members.length,
      0
    );
    return mainTeamCount + subTeamCount;
  };

  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl"
        style={{
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MdEdit className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Team</h2>
              <p className="text-sm text-gray-500">
                Total Members: {getTotalMembers()} | Sub-teams:{" "}
                {subTeams.length}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ImCross size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("main")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "main"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Main Team ({selectedMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("subteams")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "subteams"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Sub-teams ({subTeams.length})
          </button>
        </div>

        {/* Form Content */}
        <div
          className="p-6 space-y-6 overflow-y-auto"
          style={{ flex: 1, minHeight: 0 }}
        >
          {activeTab === "main" && (
            <>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Enter team description"
                />
              </div>

              {/* Members Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Main Team Members * ({selectedMembers.length} selected)
                </label>

                {/* Search Members */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Search members by name, email, or role..."
                  />
                </div>

                {/* Members List */}
                <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  {filteredMembers.map((member) => {
                    const isSelected = selectedMembers.find(
                      (m) => m.id === member.id
                    );
                    const isInSubTeam = subTeams.some((subTeam) =>
                      subTeam.members.find((m) => m.id === member.id)
                    );

                    return (
                      <div
                        key={member.id}
                        onClick={() => !isInSubTeam && toggleMember(member)}
                        className={`p-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                          isInSubTeam
                            ? "bg-gray-100 cursor-not-allowed opacity-50"
                            : isSelected
                            ? "bg-orange-50 border-orange-200 cursor-pointer"
                            : "hover:bg-gray-50 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                  ? "bg-orange-600 border-orange-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <FaCheck
                                  size={14}
                                  className="text-white"
                                />
                              )}
                            </div>
                            <div>
                              <div className="font-[400] text-gray-900">
                                {member.name}
                                {isInSubTeam && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    (In Sub-team)
                                  </span>
                                )}
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
                            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
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
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-900 mb-2">
                    Selected Members List:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => {
                      return (
                        <span
                          key={member.id}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            teamLead && teamLead.id === member.id
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {member.name}
                          {teamLead && teamLead.id === member.id && (
                            <span className="ml-1 text-xs">(Lead)</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "subteams" && (
            <div className="space-y-6">
              {/* Add Sub-team Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Sub-teams</h3>
                <button
                  onClick={addSubTeam}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <FaPlus size={16} />
                  Add Sub-team
                </button>
              </div>
              {subTeams.map((subTeam, index) => (
                <div
                  key={subTeam.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      {/* <FaUsers size={16} /> */}
                      <FaUsers size={16} />
                      Sub-team {index + 1}
                    </h4>
                    <button
                      onClick={() => removeSubTeam(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaMinus size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Sub-team Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sub-team Name *
                      </label>
                      <input
                        type="text"
                        value={subTeam.name}
                        onChange={(e) =>
                          updateSubTeam(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter sub-team name"
                      />
                    </div>

                    {/* Sub-team Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={subTeam.description}
                        onChange={(e) =>
                          updateSubTeam(index, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter sub-team description"
                      />
                    </div>
                  </div>

                  {/* Sub-team Members */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Members ({subTeam.members.length} selected)
                    </label>
                    <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                      {getAvailableMembersForSubTeam(index).map((member) => {
                        const isSelected = subTeam.members.find(
                          (m) => m.id === member.id
                        );
                        return (
                          <div
                            key={member.id}
                            onClick={() => toggleSubTeamMember(index, member)}
                            className={`p-3 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-orange-50 border-orange-200"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                    isSelected
                                      ? "bg-orange-600 border-orange-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {isSelected && (
                                    <FaCheck
                                      size={14}
                                      className="text-white"
                                    />
                                  )}
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
                  </div>

                  {/* Sub-team Lead */}
                  {subTeam.members.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Sub-team Lead
                      </label>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="space-y-2">
                          {subTeam.members.map((member) => {
                            return (
                              <label
                                key={member.id}
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`subTeamLead${index}`}
                                  checked={
                                    subTeam.subTeamLead &&
                                    subTeam.subTeamLead.id === member.id
                                  }
                                  onChange={() => setSubTeamLead(index, member)}
                                  className="w-4 h-4 text-orange-600 focus:ring-orange-500"
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
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-team Members Summary */}
                  {subTeam.members.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                      <h5 className="font-medium text-green-900 mb-2">
                        Sub-team Members:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {subTeam.members.map((member) => (
                          <span
                            key={member.id}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              subTeam.subTeamLead &&
                              subTeam.subTeamLead.id === member.id
                                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {member.name}
                            {subTeam.subTeamLead &&
                              subTeam.subTeamLead.id === member.id && (
                                <span className="ml-1 text-xs">(Lead)</span>
                              )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {subTeams.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No sub-teams added yet. Click "Add Sub-team" to create one.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
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
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Update Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
