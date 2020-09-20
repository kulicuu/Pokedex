

import React from 'react';
import logo from './logo.svg'
import { connect } from 'react-redux';
import Species from './Components/Species/';
import Locations from './Components/Locations';
import Abilities from './Components/Abilities';
import Moves from './Components/Moves';
import './Pokedex.css';


const c = console.log.bind(console);


class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (

                <div className="container">
                    <Species/>
                </div>

        )
    }
}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);


