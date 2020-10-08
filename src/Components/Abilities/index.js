import React from 'react';
import { connect } from 'react-redux';


import Tiles from './Tiles';
import Card from './Card';

const c = console.log.bind(console);



class Abilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        c(this.props.selectedAbility, 'selectedAbility')
        return (

            <div>
                <h2> Abilities </h2>
                {this.props.filterReady ?
                    <input
                        disabled={!this.props.filterReady}
                        className= 'form-control'
                        type= 'text'
                        placeholder='Search Abilities...'
                        onChange= { (e) => {
                            this.props.filterAttribute(e.target.value, 'abilities')
                        }}
                    />
                : <p> Search-tree loading... </p>
                }
                { this.props.selectedAbility 
                    ?
                    <Card
                        attributeType='ability'
                        attributeKey={this.props.selectedAbility}
                    />
                    :
                    null
                }

                <Tiles/>
            </div>
        )
    }

}



function mapStateToProps(state) {
    let filterReady = state.pokedex.filterTrees.abilities ? true : false;
    let { selectedAbility, abilities } = state.pokedex;
    let filteredAttributes = state.pokedex.filteredAttributes.abilities;
    if (abilities === undefined) {
        return { selectedAbility, filterReady }   
    } else if (filteredAttributes.length === 0) {
        return Object.keys(abilities).reduce((acc, key, idx) => {
        acc[key] = abilities[key];
        return acc
        }, { selectedAbility, filterReady });
    } else {
        return filteredAttributes.reduce((acc, key, idx) => {
            acc[key] = abilities[key];
            return acc
        }, { selectedAbility, filterReady });
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


export default connect(mapStateToProps, mapDispatchToProps)(Abilities);