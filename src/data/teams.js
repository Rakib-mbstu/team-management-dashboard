export const teams = [
    {
        id: 1,
        name: "InfoImage PD",
        membersCount: 25,
        description: "This team is responsible for product development and design. Does some other stuff too.",
        teamLead: 101, // links to expertise id
        stats: { members: 10, subTeams: 1 },
        subTeams: [
            {
                id: 11,
                name: "Frontend Team",
                lead: 102, // links to expertise id
                membersCount: 5,
                members: [102, 103], // expertise ids
            },
            // Add more subTeams as needed
        ],
    },
    // Add more teams as needed
];
export default teams;