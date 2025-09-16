import React, { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import FilterBar from "../components/filterbar";
import SetMealIcon from "@mui/icons-material/SetMeal"; // fish
import SpeedIcon from "@mui/icons-material/Speed"; // productivity
import OpacityIcon from "@mui/icons-material/Opacity"; // water/output

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Mock farm data
const farmData = [
  {
    id: 1,
    name: "Blue Lake Farm",
    location: "Lake Tanganyika",
    species: "Tilapia",
    productivity: 85,
    output: 2500,
    lat: -6.133,
    lng: 29.750,
    owner: "John Mwangi",
    email: "john.mwangi@bluelakefarm.com",
    phone: "+255 712 345 678"
  },
  {
    id: 2,
    name: "Green Valley Fishery",
    location: "Lake Victoria",
    species: "Catfish",
    productivity: 80,
    output: 2000,
    lat: -2.516,
    lng: 32.900,
    owner: "Grace Njoroge",
    email: "grace.njoroge@gvf.com",
    phone: "+254 723 111 222"
  },
  {
    id: 3,
    name: "Victoria Aquatics",
    location: "Near Lake Victoria",
    species: "Tilapia",
    productivity: 90,
    output: 3000,
    lat: -1.350,
    lng: 33.200,
    owner: "Samuel Okello",
    email: "samuel.okello@lva.com",
    phone: "+256 770 555 444"
  },
  {
    id: 4,
    name: "Tanganyika Salmon Farm",
    location: "Near Lake Tanganyika",
    species: "Salmon",
    productivity: 88,
    output: 2700,
    lat: -7.000,
    lng: 30.000,
    owner: "Asha Juma",
    email: "asha.juma@tsf.com",
    phone: "+255 768 999 888"
  },
];

const COLORS = ["#42515e", "#405551", "#3a3427", "#5b4b43"];

const FarmTableRows = ({ farms }) => (
  <>
    {farms.map((farm) => (
      <tr key={farm.id}>
        <td>{farm.name}</td>
        <td>{farm.owner}</td>
        <td><a href={`mailto:${farm.email}`}>{farm.email}</a></td>
        <td><a href={`tel:${farm.phone}`}>{farm.phone}</a></td>
        <td>{farm.location}</td>
        <td>{farm.species}</td>
        <td>{farm.output}</td>
      </tr>
    ))}
  </>
);

const Dashboard = ({ activePage, sidebarOpen }) => {
  // Filters for Farms section
  const [location, setLocation] = useState("All Locations");
  const [species, setSpecies] = useState("All Species");

  const handleClear = () => {
    setLocation("All Locations");
    setSpecies("All Species");
  };

  const filteredFarms = farmData.filter((farm) => {
    const matchLocation = location === "All Locations" || farm.location === location;
    const matchSpecies = species === "All Species" || farm.species === species;
    return matchLocation && matchSpecies;
  });

  // Stats
  const totalFarms = farmData.length;
  const avgProductivity = Math.round(
    farmData.reduce((sum, f) => sum + f.productivity, 0) / farmData.length
  );
  const totalOutput = farmData.reduce((sum, f) => sum + f.output, 0);

  // Grouped data
  const speciesData = farmData.reduce((acc, farm) => {
    const found = acc.find((s) => s.species === farm.species);
    if (found) found.output += farm.output;
    else acc.push({ species: farm.species, output: farm.output });
    return acc;
  }, []);

  const locationData = farmData.reduce((acc, farm) => {
    const found = acc.find((l) => l.location === farm.location);
    if (found) found.output += farm.output;
    else acc.push({ location: farm.location, output: farm.output });
    return acc;
  }, []);

  return (
    <div className={`dashboard ${sidebarOpen ? "shrunk" : ""}`}>
      <Header />

      {/* Overview */}
      {activePage === "Overview" && (
        <>
         <div className="cards">
  <DashboardCard
    title="Total Farms"
    value={totalFarms}
    description="Active Farms"
    icon={<SetMealIcon style={{ fontSize: 28, color: "#0d3b66",alignItems: "center" }} />}
  />
  <DashboardCard
    title="Avg Productivity"
    value={`${avgProductivity}%`}
    description="Efficiency Rating"
    icon={<SpeedIcon style={{ fontSize: 28, color: "#0d3b66", alignItems: "center" }} />}
  />
  <DashboardCard
    title="Total Output"
    value={`${(totalOutput / 1000).toFixed(1)}K`}
    description="tons/year"
    icon={<OpacityIcon style={{ fontSize: 28, color: "#0d3b66", alignItems: "center" }} />}
  />
</div>



          <div style={{ display: "flex", gap: "30px", marginTop: "30px", flexWrap: "wrap" }}>
            {/* Species Chart */}
            <div style={{ flex: 1, minWidth: "400px", background: "white", padding: "20px", borderRadius: "16px" }}>
              <h3>Total Production by Species</h3>
              <ResponsiveContainer width="90%" height={300}>
                <BarChart data={speciesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="species" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="output" fill="#3c4c5b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Location Chart */}
            <div style={{ flex: 1, minWidth: "400px", background: "white", padding: "20px", borderRadius: "16px" }}>
              <h3>Total Production by Location</h3>
              <ResponsiveContainer width="90%" height={300}>
                <PieChart>
                  <Pie
                    data={locationData}
                    dataKey="output"
                    nameKey="location"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Browse Farms */}
      {activePage === "Browse Farms" && (
        <div className="farm-map">
          <h3>Browse Farms (Tanzania)</h3>
          <MapContainer center={[-6.3690, 34.8888]} zoom={6} style={{ height: "550px", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {farmData.map((farm) => (
              <Marker key={farm.id} position={[farm.lat, farm.lng]}>
                <Popup>
                  <b>{farm.name}</b> <br />
                  {farm.location} <br />
                  Species: {farm.species} <br />
                  Output: {farm.output} tons <br />
                  Owner: {farm.owner} <br />
                  <a href={`mailto:${farm.email}`}>{farm.email}</a> <br />
                  <a href={`tel:${farm.phone}`}>{farm.phone}</a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* Farms Section (Filters + Table) */}
      {activePage === "Farms" && (
        <div>
          <h3>Farms</h3>
          <Filterbar
            location={location}
            setLocation={setLocation}
            species={species}
            setSpecies={setSpecies}
            handleClear={handleClear}
          />
          <div className="farm-table">
            <table>
              <thead>
                <tr>
                  <th>Farm Name</th>
                  <th>Owner</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Species</th>
                  <th>Output (tons)</th>
                </tr>
              </thead>
              <tbody>
                <FarmTableRows farms={filteredFarms} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
