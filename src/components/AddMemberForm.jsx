import { useState } from "react";
import { useMembers } from "../context/TeamMemberContext";

export default function AddMemberForm() {
    const { dispatch } = useMembers();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_MEMBER",
            payload: {
                id: Date.now(),
                name,
                role,
                experience: 0,
                status: "active",
            },
        });
        setName("");
        setRole("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                className="border p-2 rounded"
                placeholder="Member name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                className="border p-2 rounded"
                placeholder="Role"
                value={role}
                onChange={e => setRole(e.target.value)}
                required
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                Add Member
            </button>
        </form>
    );
}