import React from "react";

// Renamed to FilterBar for consistent casing and convention
const FilterBar = ({ location, setLocation, species, setSpecies, handleClear }) => {
  return (
    <div className="filter-bar">
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option>All Locations</option>
        <option>Lake Victoria</option>
        <option>Lake Tanganyika</option>
        <option>Near lake Tanganyika</option>
      </select>

      <select value={species} onChange={(e) => setSpecies(e.target.value)}>
        <option>All Species</option>
        <option>Tilapia</option>
        <option>Catfish</option>
        <option>Mgebuka</option>
      </select>

      <button className="clear-btn" onClick={handleClear}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;
