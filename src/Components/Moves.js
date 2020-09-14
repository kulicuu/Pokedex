import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);


class Moves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <ul>
                {Object.keys(this.props).map(move => <li> {move} </li>)}
            </ul>
        )
    }
}


function mapStateToProps(state) {
    let { moves } = state.pokedex;
    let props = Object.keys(moves).reduce((acc, key, idx) => {
        acc[key] = moves[key];
        return acc
    }, {});
    return props
}


function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Moves);