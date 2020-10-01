
import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);


class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { speciesName, idx } = this.props;

        return (
            <button
                className='btn btn-secondary'
                onClick={() => {
                    this.props.setSelectedSpecies(speciesName)
                    let selected = this.props.species;
                    if (selected.pokemon) {
                        this.props.getDetails({
                            attributeKey: speciesName,
                            uri: selected.pokemon.url
                        })
                    } else if (selected.varieties) {
                        this.props.getDetails({
                            attributeKey: speciesName,
                            uri: selected.varieties[0].pokemon.url
                        })
                    } else {
                        c('error')
                    }
                }}
                >
                    {speciesName}
            </button>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return ownProps;
}


function mapDispatchToProps(dispatch) {
    return {
        getDetails: ({attributeKey, uri}) => {
            c(uri, 'uri')
            dispatch({
                type: 'getDetails',
                payload: {
                    attributeType: 'species',
                    attributeKey,
                    uri
                }
            })
        },
        setSelectedSpecies: (speciesName) => {
            dispatch({
                type: 'setSelectedSpecies',
                payload: { speciesName }
            })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Tile);