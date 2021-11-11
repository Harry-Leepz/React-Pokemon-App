import React, { useState, useEffect } from 'react';
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


  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
