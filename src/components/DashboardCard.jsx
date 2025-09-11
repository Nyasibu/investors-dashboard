import React from "react";

const DashboardCard = ({ title, value, description, icon }) => {
  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {icon}
        <h4>{title}</h4>
      </div>
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DashboardCard;
