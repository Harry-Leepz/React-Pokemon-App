import React from 'react'

const Card = ({ pokemon }) => {
    return (
        <div className='card mt-5 text-center rounded-0'>
            <div className="card-header bg-orange">
                <p className='text-dark font-weight-bold'># {pokemon.id}</p>
            </div>
            <img className='image mx-auto' src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="card-body">
                <p className='text-dark font-weight-bold'>{pokemon.name}</p>
            </div>
        </div>
    )
}

export default Card
