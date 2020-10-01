
import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);


class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { abilityName, idx } = this.props;

        return (
            <button
                className='btn btn-secondary'
                onClick={() => {
                    this.props.setSelectedAbility(abilityName)
                    let selected = this.props.ability;
                    if (selected.pokemon) {
                        this.props.getDetails({
                            attributeKey: abilityName,
                            uri: selected.pokemon.url
                        })
                    } else if (selected.varieties) {
                        this.props.getDetails({
                            attributeKey: abilityName,
                            uri: selected.varieties[0].pokemon.url
                        })
                    } else {
                        c('error')
                    }
                }}
                >
                    {abilityName}
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
            // c(uri, 'uri')
            dispatch({
                type: 'getDetails',
                payload: {
                    attributeType: 'abilities',
                    attributeKey,
                    uri
                }
            })
        },
        setSelectedAbility: (abilityName) => {
            dispatch({
                type: 'setSelectedAbility',
                payload: { abilityName }
            })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Tile);