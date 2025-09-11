import React, { useState, useEffect } from "react";

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);

  const [speciesFilter, setSpeciesFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // ✅ Fetch farms from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/farms") // replace with your API
      .then((res) => res.json())
      .then((data) => {
        setFarms(data);
        setFilteredFarms(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Apply filters whenever filters change
  useEffect(() => {
    let result = farms;

    if (speciesFilter) {
      result = result.filter((farm) =>
        farm.species.toLowerCase().includes(speciesFilter.toLowerCase())
      );
    }

    if (locationFilter) {
      result = result.filter((farm) =>
        farm.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredFarms(result);
  }, [speciesFilter, locationFilter, farms]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Farms</h2>

      {/* ✅ Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by species"
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <button
          className="clear-btn"
          onClick={() => {
            setSpeciesFilter("");
            setLocationFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* ✅ Farms List Table */}
      <div className="farm-table">
        <table>
          <thead>
            <tr>
              <th>Farmer Name</th>
              <th>Location</th>
              <th>Species</th>
              <th>Output (kg)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarms.map((farm) => (
              <tr
                key={farm.id}
                onClick={() => setSelectedFarm(farm)}
                style={{ cursor: "pointer" }}
              >
                <td>{farm.name}</td>
                <td>{farm.location}</td>
                <td>{farm.species}</td>
                <td>{farm.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Selected Farm Details */}
      {selectedFarm && (
        <div className="farm-table mt-6">
          <h3>Farm Details</h3>
          <table>
            <tbody>
              <tr>
                <th>Farmer Name</th>
                <td>{selectedFarm.name}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{selectedFarm.location}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td>{selectedFarm.species}</td>
              </tr>
              <tr>
                <th>Output</th>
                <td>{selectedFarm.output} kg</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <a href={`mailto:${selectedFarm.email}`}>
                    {selectedFarm.email}
                  </a>
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>
                  <a href={`tel:${selectedFarm.phone}`}>
                    {selectedFarm.phone}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Farms;
