import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      {/* ☰ Button only shows when sidebar is closed */}
      {!sidebarOpen && (
        <button 
          className="toggle-btn" 
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Dashboard stays as-is, just shrinks when sidebar opens */}
      <Dashboard activePage={activePage} sidebarOpen={sidebarOpen} />
    </div>
  );
}

export default App;
