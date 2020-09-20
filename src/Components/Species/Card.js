import React from 'react';
import { connect } from 'react-redux';


const c = console.log.bind(console);
// const _ = require('lodash');



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div
                className='card'
                style={{ width: '18rem'}}                    
            >
                <img
                    src={this.props.imgSrc}
                    className='card-img-top'
                />
                <div
                    className='card-body'
                >
                    { this.props.attributeKey }
                </div>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {

    let { attributeKey, attributeType } = ownProps;
    return {
        details: state.pokedex.details[attributeType][attributeKey],
        imgSrc: state.pokedex.images[attributeType][attributeKey]
    }
}


function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Card)