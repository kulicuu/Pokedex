import React from 'react';
import { connect } from 'react-redux';
import './Species.css';
import Card from './Card';
const c = console.log.bind(console);
const _ = require('lodash');


class Species extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSpecies: null
        }
    }

    render() {
        return (
            <div className='Species'>
                <h2> Species </h2>

                <input 
                    className= 'form-control'
                    type= 'text'
                    placeholder='Search Species...'
                    onChange= { (e) => {
                        this.props.filterAttribute(e.target.value, 'species')
                    }}
                />

                { this.state.selectedSpecies 
                    ? 
                    <Card
                        attributeType='species'
                        attributeKey={this.state.selectedSpecies}

                    />
                    : 
                    null
                }

                <div
                    className='btn-group Btn-group' role='group'
                >
                    { Object.keys(this.props).map((key, idx) => {
                        if (key !=='filterAttribute' && key !== 'getDetails') return <button
                            className='btn btn-secondary'
                            key={`species:${idx}`}
                            onClick={() => {
                                let selected = this.props[key];
                                this.setState({ selectedSpecies: key })
                                if (selected.pokemon) {
                                    this.props.getDetails({
                                        attributeKey: key,
                                        uri: selected.pokemon.url
                                    })
                                } else if (selected.varieties) {
                                    this.props.getDetails({
                                        attributeKey: key,
                                        uri: selected.varieties[0].pokemon.url
                                    })
                                } else {
                                    c('error')
                                } 
                            }}
                            >
                                {key}
                            </button>
                    }) }
                </div>



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


    return {
        getDetails: ({attributeKey, uri}) => {
            c(uri, 'uri')
            dispatch({
                type: 'getDetails',
                payload: {
                    attributeType: 'species',
                    attributeKey,
                    uri
                }
            })
        },
        filterAttribute: (prefix, attributeType) => {
            dispatch({
                type: 'filterAttribute', 
                payload: { attributeType, prefix }
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Species);