import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Teams from "./components/Teams";

function App() {
  const [count, setCount] = useState(0);

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
        <Teams />
      </div>
    </>
  );
}

export default App;
