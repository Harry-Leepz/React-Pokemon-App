import React, { Component } from "react";
import axios from "axios";
export default class Pokemon extends Component {
    state={
        name:'',
        pokemonId:'',
        imageUrl:'',
        types: [],
        description: '',
        statTitleWidth: 3,
        statBarWidth: 9,
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
    }

    async componentDidMount() {
        const { pokemonId } = this.props.match.params;

        //Urls for API requests
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

        // Get Pokemon Information
        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default

        // Get Pokemon Stats
        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
              case 'hp':
                hp = stat['base_stat'];
                break;
              case 'attack':
                attack = stat['base_stat'];
                break;
              case 'defense':
                defense = stat['base_stat'];
                break;
              case 'speed':
                speed = stat['base_stat'];
                break;
              case 'special-attack':
                specialAttack = stat['base_stat'];
                break;
              case 'special-defense':
                specialDefense = stat['base_stat'];
                break;
              default:
                break;
            }
          });

        this.setState({name, imageUrl})
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <img src={this.state.imageUrl} alt={this.state.name} />
            </div>
        )
    }
}

