import { useState } from "react";

import "./App.css";
import Teams from "./components/Teams";
import Footer from "./components/Footer";
import Summary from "./components/Summary.jsx";
import { teams } from "./data/teams.js";
import DashboardHeader from "./components/DashboardHeader.jsx";
import { TeamsContainer, TeamsProvider } from "./context/TeamsContext.jsx";
function App() {
  const [count, setCount] = useState(0);

  const totalTeams = teams.length;
  const totalMembers = teams.reduce((acc, team) => acc + team.stats.members, 0);
  // Add context and state management with useContext and Reducer
  // for ref: https://react.dev/learn/scaling-up-with-reducer-and-context
  {
    /* 
      1. I am drilling down the teams data to the Teams component.
      2. I will use useContext to manage the state of the teams data.
      3. I will create a context for the teams data and use it in the Teams component.
      4. I will use useReducer to manage the state of the teams data.
    */
  }

  return (
    <div className="flex flex-col min-h-screen mt-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Team Management Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your organization's teams and members
        </p>
      </div>
      <div className="flex flex-col justify-between items-end mb-8">
        <DashboardHeader />
      </div>
      {/* <TeamsProvider teams={teams}>
        {teams.map((team) => (
          <Teams
            key={team.id}
            teamId={team.id}
          />
        ))}
      </TeamsProvider> */}
      <TeamsContainer />
      <Summary
        totalTeams={totalTeams}
        totalMembers={totalMembers}
      />
      <Footer />
    </div>
  );
}

export default App;
