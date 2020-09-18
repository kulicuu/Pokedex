import React from 'react';

const c = console.log.bind(console);
const Card = props => {
    // c('specie', props)
    let { specie } = props;
    return (
        <div
            className="Card"
        >
            <p> {specie} </p>

        </div>
    )
}

export default Card