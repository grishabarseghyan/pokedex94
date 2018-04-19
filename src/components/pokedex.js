import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchPokemons} from "../actions/pokemonsActions"
import {fetchTypes} from "../actions/typesActions";
import loader from '../loader/pikachu-loader.gif'
import Pagination from "./pagination";
import Types from "./types";


class Pokedex extends Component {

    state = {
        search: ''
    };

    componentWillMount() {
        this.props.dispatch(fetchPokemons());
        this.props.dispatch(fetchTypes())
    }

    handleSearch() {
        this.setState({
            search: this.refs.search.value
        });
    }

    render() {
        let pokemons = this.props.pokemon;

        let filteredPokemons = pokemons.filter((pokemon) => {
            return pokemon.name.indexOf(this.state.search) !== -1;
        });

        let mappedPokemon = filteredPokemons.map((pokemon, index) => {
            let types = pokemon.types.map((types, i) => {
                return <div key={i}>{types.type.name}</div>
            });
            let attributes = pokemon.abilities.map((attr, i) => {
                return <div key={i}>{attr.ability.name}</div>
            });
            return <div className='row body' key={index}>
                <div className="col-md-2"><img src={pokemon.sprites.front_default} alt="" className="thumbnail"/></div>
                <div className="col-md-3">{pokemon.name}</div>
                <div className="col-md-3">{types}</div>
                <div className="col-md-4">{attributes}</div>
            </div>
        });

        if (this.props.loader) {
            return (
                <div className='loaderWrapper'>
                    <img src={loader} className='loader' alt="Loading"/>
                </div>
            )
        }

        return (
            <div className='container'>
                <div className="row">
                <div className="col-md-6"><Types/></div>
                <div className="col-md-6">
						<form className="form-group">
							<label>Search</label>
                    <input
                        className="form-control"
                        type="text"
                        value={this.state.search }
                        onChange={this.handleSearch.bind(this)}
                        ref='search'
                    />
                	</form>                
                </div>
                </div>
                
                <div className={'row table-container'}>
                	<div className="col-md-12">
                    <div className={"row head"}>
                        <div className="col-md-2">Picture</div>
                        <div className="col-md-3">Name</div>
                        <div className="col-md-3">Type</div>
                        <div className="col-md-4">Attributes</div>
                    </div>
                    
                    {mappedPokemon}
                   </div>
                </div>
                <Pagination/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
    pokemon: state.pokemons.pokemons,
    loader: state.pokemons.fetching,
	}
}

export default connect(mapStateToProps)(Pokedex);
