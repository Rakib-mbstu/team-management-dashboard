import { FaPersonRifle } from "react-icons/fa6";
function TeamMember({ }) {
    return (
        <div className="ml-8">
            <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-300 cursor-pointer">
                    <span className="text-sm"><FaPersonRifle /></span>
                    <div className="text-xs">
                        <div className="font-medium">Masudur</div>
                        <div className="text-gray-600">React/Next Js dev</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TeamMember;