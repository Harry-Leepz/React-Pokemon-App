import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/Pokemon';
import Navbar from './components/layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  // State Variables
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    // Initial API call to get and set data in state
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.nest)
      setPrevUrl(response.prev)
      // Response is the api response, results is the name of the array in the API object
      await loadingPokemon(response.results)
      setLoading(false)
    }
    fetchData()
  }, [])

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url)
      return pokemonRecord
    }))

    setPokemonData(_pokemonData)
  }

  return (
    <div className="App">
      <Navbar />
      { loading ? <h1>Loading...</h1> : (
        <h1>Data is fetched.....</h1>
      )}
    </div>
  );
}

export default App;
