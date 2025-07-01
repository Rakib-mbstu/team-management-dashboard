import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Teams from "./components/Teams";
import Footer from "./components/Footer";
import Summery from "./components/Summery";
import teams from "./data/teams.js";
function App() {
  const [count, setCount] = useState(0);
  console.log("Teams data:", teams);

  return (
    <>
      <div className="flex flex-col min-h-screen mt-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Team Management Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your organization's teams and members
          </p>
        </div>
        {teams.map((team) => {
          return (
            <Teams
              key={team.id}
              name={team.name}
              description={team.description}
              teamLead={team.teamLead}
              stats={team.stats}
              subTeams={team.subTeams}
            />
          );
        })}
        <Summery />
        <Footer />
      </div>
    </>
  );
}

export default App;
