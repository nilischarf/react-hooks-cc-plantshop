import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((response) => response.json())
      .then(setPlants)
  }, [])

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant])
  }

  function handleDeletePlant(id) {
    setPlants(plants.filter((plant) => plant.id !== id))
  }

  function handleUpdatePlant(updatedPlant) {
    setPlants(plants.map((plant) => 
      plant.id === updatedPlant.id ? updatedPlant : plant 
    ))
  }

  const filteredPlants = plants.filter((plant) => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList 
        plants={filteredPlants} 
        onDeletePlant={handleDeletePlant}
        onUpdatePlant={handleUpdatePlant}
      />
    </main>
  );
}

export default PlantPage;
