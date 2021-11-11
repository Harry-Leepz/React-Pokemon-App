// Make APi call to PokeAPI to get a list of All pokemon.
// https://pokeapi.co/api/v2/pokemon
export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                resolve(data)
            })
    });
}

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json()).then(data => {
            resolve(data)
        })
    })
}