// components/MemberSearchHeader.jsx
import { useState } from "react";

const MemberSearchHeader = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass name search query to parent
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value); // Pass filter value to parent
  };

  return (
    <div className="mb-8">
      <div className="mt-4 flex space-x-4 sm:flex-row flex-col gap-y-4">
        <input
          type="text"
          placeholder="Search members by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full sm:w-64"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none  focus:border-blue-500 w-full sm:w-48"
        >
          <option value="all">All Members</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          {/* Add more filters as needed, e.g., by role */}
        </select>
      </div>
    </div>
  );
};

export default MemberSearchHeader;
