import React from 'react';
import logo from './logo.svg'
import { connect } from 'react-redux';
import Species from './Components/Species'

const c = console.log.bind(console);


class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }


    }


    render() {


        c(this.props.species, 'aeouau')
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>

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


