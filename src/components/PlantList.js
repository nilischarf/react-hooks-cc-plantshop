import React, { useState } from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  const [plantList, setPlantList] = useState(plants)

function handleDeletePlant(id) {
  setPlantList(plantList.filter((plant) => plant.id !== id))
}

  return (
    <ul className="cards">
      {plantList.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onDeletePlant={handleDeletePlant} /> 
      ))}
    </ul>
  );
}

export default PlantList;
