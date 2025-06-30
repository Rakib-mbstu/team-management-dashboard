import React from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaSquarePersonConfined } from "react-icons/fa6";
import { FaPersonHarassing } from "react-icons/fa6";
import { MdOutlinePersonalVideo } from "react-icons/md";
import SubTeams from "./SubTeams";
function Teams() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">InfoImage PD</h3>
            <div className="flex items-center">
              <FaSquarePersonConfined />
              <span className="text-sm ml-1">25 Members</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-violet-200">
            This team is responsible for product development and design. Does
            some other shit too
          </p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">
              {" "}
              <FaPersonHarassing />{" "}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-col">
                <span className="font-semibold">Baki bro</span>
              </div>
              <p className="text-sm">Team lead</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <BsPersonPlusFill /> <span> 10 members</span>
              <MdOutlinePersonalVideo />
              <span className="pr-2">1 sub team</span>
            </div>
          </div>
        </div>
        <SubTeams />
      </div>
    </div>
  );
}
export default Teams;
