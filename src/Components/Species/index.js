import React from 'react';
import { connect } from 'react-redux';
import './Species.css';
import Card from './Card';
import Tiles from './Tiles';
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
                {this.props.filterReady ?
                    <input
                        disabled={!this.props.filterReady}
                        className= 'form-control'
                        type= 'text'
                        placeholder='Search Species...'
                        onChange= { (e) => {
                            this.props.filterAttribute(e.target.value, 'species')
                        }}
                    />
                : <p>Search Tree Loading...</p>
                }

                { this.props.selectedSpecies 
                    ? 
                    <Card
                        attributeType='species'
                        attributeKey={this.props.selectedSpecies}

                    />
                    : 
                    null
                }
                <div
                    className='btn-group Btn-group' role='group'
                >
                    <Tiles/>

                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    let filterReady = state.pokedex.filterTrees.species ? true : false;
    let { selectedSpecies, species } = state.pokedex;
    let filteredAttributes = state.pokedex.filteredAttributes.species;
    if (species === undefined) {
        return { selectedSpecies, filterReady }   
    } else if (filteredAttributes.length === 0) {
        return Object.keys(species).reduce((acc, key, idx) => {
        acc[key] = species[key];
        return acc
        }, { selectedSpecies, filterReady });
    } else {
        return filteredAttributes.reduce((acc, key, idx) => {
            acc[key] = species[key];
            return acc
        }, { selectedSpecies, filterReady });
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