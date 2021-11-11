import React, { useState, useEffect } from 'react';
import { getAllPokemon } from './services/Pokemon';
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
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      console.log(response);
      setNextUrl(response.nest)
      setPrevUrl(response.prev)
      setLoading(false)
    }
    fetchData()
  }, [])

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
