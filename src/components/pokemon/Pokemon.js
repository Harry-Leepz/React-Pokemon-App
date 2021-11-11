import React, { Component } from "react";
import axios from "axios";

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };
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
            <div className="col mt-5">
                <div className="card" style={{ backgroundColor:'#212121', border: '3px #fafafa solid' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <p className='font-weight-bold text-light'># {this.state.pokemonId} <span className='font-weight-bold ml-2'>{this.state.name }</span></p>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                {this.state.types.map(type => (
                                    <span
                                    key={type}
                                    className="badge badge-pill mr-1"
                                    style={{
                                        backgroundColor: `#${TYPE_COLORS[type]}`,
                                        color: 'white'
                                    }}
                                    >
                                    {type
                                        .toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')}
                                    </span>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body"></div>
                </div>
            </div>
        )
    }
}

