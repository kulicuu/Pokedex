import React from 'react';
import { connect } from 'react-redux';
import './Species.css';

const c = console.log.bind(console);
const _ = require('lodash');


class Species extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <input 
                    className= 'form-control'
                    type= 'text'
                    placeholder='species'
                    onChange= { (e) => {
                        this.props.filterAttribute(e.target.value, 'species')
                    }}
                />

                <div
                    className='btn-group' role='group'
                >
                    { Object.keys(this.props).map((key, idx) => {
                        return <button
                            key={`species:${idx}`}
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
        filterAttribute: (prefix, attributeType) => {
            dispatch({
                type: 'filterAttribute', 
                payload: { attributeType, prefix }
            })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Species);