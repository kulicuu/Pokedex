import React from 'react';

const c = console.log.bind(console);
const UmbraCard = props => {
    let { specie, idx } = props;
    return (
        <div
            className="Card"

        >
            <p> {specie} </p>

        </div>
    )
}

export default UmbraCard