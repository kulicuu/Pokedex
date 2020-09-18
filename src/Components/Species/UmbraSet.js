

import React from 'react';
import { connect } from 'react-redux';
import './UmbraSet.css'


const c = console.log.bind(console);
const _ = require('lodash');




class UmbraSet extends React.Component {
    constructor(props) {
        super(props);
        this.state= {}
    }


    render() {

        return (

            <div className='UmbraSet'>
                nths

            </div>

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



export default connect(mapStateToProps, mapDispatchToProps)(UmbraSet);