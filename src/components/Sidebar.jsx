import React from "react";
import WavesIcon from "@mui/icons-material/Waves"; // Overview icon
import TravelExploreIcon from "@mui/icons-material/TravelExplore"; // Browse Farms icon
import SetMealIcon from "@mui/icons-material/SetMeal"; // Farms icon

const Sidebar = ({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {/* Toggle Button */}
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✖
        </button>
        <h2>AquaInvestor</h2>
      </div>

      <ul>
        <li
          className={activePage === "Overview" ? "active" : ""}
          onClick={() => setActivePage("Overview")}
        >
          <div className="menu-item">
            <WavesIcon className="menu-icon" />
            <span>Overview</span>
          </div>
        </li>

        <li
          className={activePage === "Browse Farms" ? "active" : ""}
          onClick={() => setActivePage("Browse Farms")}
        >
          <div className="menu-item">
            <TravelExploreIcon className="menu-icon" />
            <span>Browse Farms</span>
          </div>
        </li>

        <li
          className={activePage === "Farms" ? "active" : ""}
          onClick={() => setActivePage("Farms")}
        >
          <div className="menu-item">
            <SetMealIcon className="menu-icon" />
            <span>Farms</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
