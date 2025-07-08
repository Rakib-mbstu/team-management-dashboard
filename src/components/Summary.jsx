import { BsPerson } from "react-icons/bs";
import { GrPersonalComputer } from "react-icons/gr";

const Summary = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <GrPersonalComputer />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Teams</p>
            <p className="text-2xl font-bold text-gray-900">10</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BsPerson />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">100</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BsPerson />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">100</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BsPerson />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
