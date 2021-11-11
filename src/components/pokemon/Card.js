import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ pokemon }) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} >
            <div className='card mt-5 text-center rounded-0'>
                <div className="card-header bg-orange">
                    <p className='text-dark font-weight-bold'># {pokemon.id}</p>
                </div>
                <img className='image mx-auto' src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className="card-body">
                    <p className='text-dark font-weight-bold'>{pokemon.name}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card
