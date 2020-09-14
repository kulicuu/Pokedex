import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);


class Abilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ul>
                {Object.keys(this.props).map((ability, idx) =><li key={`ability${idx}`}> { ability } </li>)}
            </ul>
        )
    }
}


function mapStateToProps(state) {
    let { abilities } = state.pokedex;
    let props = Object.keys(abilities).reduce((acc, key, idx) => {
        acc[key] = abilities[key];
        return acc
    }, {});
    return props
}


function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Abilities);