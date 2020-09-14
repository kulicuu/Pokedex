import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);


class Species extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <ul>
                {Object.keys(this.props).map((specie, idx) => <li key={`species:${idx}`}> {specie} </li>)}
            </ul>
        )
    }
}


function mapStateToProps(state) {
    let { species } = state.pokedex;
    let props = Object.keys(species).reduce((acc, key, idx) => {
        acc[key] = species[key];
        return acc
    }, {});
    return props
}


function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Species);