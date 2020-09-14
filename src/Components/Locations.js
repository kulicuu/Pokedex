import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ul>
                {Object.keys(this.props).map((location, idx) => <li key={`location:${idx}`}> { location } </li>)}
            </ul>
        )
    }
}


function mapStateToProps(state) {
    let { locations } = state.pokedex;
    let props = Object.keys(locations).reduce((acc, key, idx) => {
        acc[key] = locations[key];
        return acc
    }, {});
    return props
}


function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Locations);