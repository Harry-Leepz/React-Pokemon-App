import React from 'react'
import Card from './Card'

const Pokedex = ({ pokemonData, loading }) => {
    if(loading) {
        return <h1> Loading....</h1>
    } else {
        return (
        <>
            <div className="grid-container">
            {pokemonData.map((pokemon, index) => {
                return <Card  key={index} pokemon={pokemon}/>
            })}
            </div>
        </>)
    }
}

export default Pokedex
