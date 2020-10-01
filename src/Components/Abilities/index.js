import React from 'react';
import { connect } from 'react-redux';


import Tiles from './Tiles';

const c = console.log.bind(console);



class Abilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (

            <div>
                <h2> Abilities </h2>
                <Tiles/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Abilities);