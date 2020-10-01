


import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile';

const c = console.log.bind(console);


class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div
                className='btn-group Btn-group' role='group'
            >
                { Object.keys(this.props).map((key, idx) => {
                    return <Tile 
                        key={`speciesTile:${idx}`}
                        species={this.props[key]}
                        speciesName={key} idx={idx}
                        />
                }) }
            </div>
        )
    }
}


function mapStateToProps(state) {
    let species = state.pokedex.species;
    let filteredAttributes = state.pokedex.filteredAttributes.species;
    if (species === undefined) {
        return {}   
    } else if (filteredAttributes.length === 0) {
        return Object.keys(species).reduce((acc, key, idx) => {
        acc[key] = species[key];
        return acc
        }, {});
    } else {
        return filteredAttributes.reduce((acc, key, idx) => {
            acc[key] = species[key];
            return acc
        }, {});
    }
}


function mapDispatchToProps(dispatch) {
    return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(Tiles);