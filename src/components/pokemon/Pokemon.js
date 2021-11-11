import React, { Component } from "react";
import axios from "axios";
export default class Pokemon extends Component {
    state={
        name:'',
        pokemonId:'',
        imageUrl:'',
        types: [],
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
        abilities: '',
        evs: '',
    }

    async componentDidMount() {
        const { pokemonId } = this.props.match.params;

        //Urls for API requests
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

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
        
        // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)
        const height = Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

        // Convert to pounds
        const weight = Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

        const types = pokemonRes.data.types.map(type => type.type.name)
        
        const abilities = pokemonRes.data.abilities
            .map(ability => {
                return ability.ability.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            })
            .join(', ');

        const evs = pokemonRes.data.stats
            .filter(stat => {
              if (stat.effort > 0) {
                return true;
              }
              return false;
            })
            .map(stat => {
              return `${stat.effort} ${stat.stat.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}`;
            })
            .join(', ')

        this.setState({name, imageUrl, pokemonId, types, height, weight, abilities, evs,
            stats: { hp, attack, defense, speed, specialAttack, specialDefense
            }
        })
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

