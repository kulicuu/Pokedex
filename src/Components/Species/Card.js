import React from 'react';
import { connect } from 'react-redux';
import './Card.css';

const c = console.log.bind(console);
// const _ = require('lodash');



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // this.props.details ? c(this.props.details) : c('none')
        return (
            <div
                className='card Card'                  
            >
                <img
                    src={this.props.imgSrc}
                    className='card-img-top'
                />
                <div
                    className='card-body'
                >
                    <h5 className='card-title'>
                        { this.props.attributeKey }
                    </h5>
                    <p className='card-text'>
                        { this.props.attributeKey }
                    </p>
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