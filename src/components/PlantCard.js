import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [price, setPrice] = useState(plant.price)

  function handleUpdatePrice(e) {
    const newPrice = e.target.value
    setPrice(newPrice)

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice })
    })
      .then((response) => response.json())
      .then(onUpdatePlant)
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    })
      .then(() => onDeletePlant(plant.id))
  }

  function handleStockToggle() {
    setIsSoldOut(!isSoldOut)
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name}/>
      <h4>{plant.name}</h4>
      <p>
        Price: $<input type="number" value={price} onChange={handleUpdatePrice} step="0.01"/> 
      </p>
      <button 
        className={isSoldOut ? "" : "primary"}
        onClick={handleStockToggle}
      >
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
      <button onClick={handleDelete}>🗑 Delete</button>
    </li>
  );
}

export default PlantCard;
