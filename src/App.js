import React, { useState } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  
  const fetchPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
      const data = await response.json();
      const pokemonList = data.results;
      
      const detailedPokemonData = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      
      setPokemonData(detailedPokemonData);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  return (
    <div>
      <h1>API Pokémon</h1>
      <button onClick={fetchPokemonData}>Get Pokémon Dex</button>
      <div>
        {pokemonData.map((pokemon, index) => (
          <div key={index} style={{ border: '1px solid green', margin: '10px', padding: '10px', backgroundColor: '#e8f5e9' }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>Name: {pokemon.name.toUpperCase()}</h2>
            <p>Type 1: {pokemon.types[0].type.name}</p>
            {pokemon.types[1] && <p>Type 2: {pokemon.types[1].type.name}</p>}
            <h3>Base stats:</h3>
            <ul>
              {pokemon.stats.map((stat, idx) => (
                <li key={idx}>{stat.stat.name} = {stat.base_stat}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
