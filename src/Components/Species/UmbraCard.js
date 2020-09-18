import React from 'react';

const c = console.log.bind(console);
const UmbraCard = props => {
    // c('specie', props)
    let { specie } = props;
    let styleObj = {
        color: "red"
    }
    return (
        <div
            style={{
                            color: "red"}
            }
            className="Card"
        >
            <p> {specie} </p>

        </div>
    )
}

export default UmbraCard