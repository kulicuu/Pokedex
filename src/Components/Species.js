import React from 'react';
import { connect } from 'react-redux';
import './Species.css'

const c = console.log.bind(console);
const _ = require('lodash');


class Species extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps() {
        return true
    }
    render() {
        c('rendering', this.props)
        return (
            <div className="Species">
                <ul>
                    {Object.keys(this.props).map((specie, idx) => <li key={`species:${idx}`}> {specie} </li>)}
                </ul>
                <input 
                    type="text"
                    onChange={(e) => {
                        c('changed', e.target.value);

                        let x = searchPrefixTree(e.target.value, this.props.filterTree);
                        c(x, 'x')
                        
                        
                    }}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    // c('mapping state to props', state.pokedex[`filterTrees:Species`])
    let { species } = state.pokedex;
    let props = Object.keys(species).reduce((acc, key, idx) => {
        acc[key] = species[key];
        return acc
    }, {});

    // return Object.assign({}, props, {
    //     filterTree: state.pokedex.filterTreesSpecies
    // })

    return { ...props, filterTree: state.pokedex.filterTrees.Species }
}


function mapDispatchToProps(dispatch) {
    return {}
}


function reduceTree(acc, tree) {
    if (acc.indexOf(tree.matchWord) === -1) {
        acc = [].concat(acc, tree.matchWord);
    }
    return _.reduce(tree.chdNodes, (acc2, node, prefix) => {
        return reduceTree(acc2, node)

    }, acc);
}

function searchPrefixTree(prefix, filterTree) {
    c(filterTree, 'filterTree')
    if (prefix.length === 0) {
        return []
    } else {
        c('else')
        let cursor = filterTree;
        c(cursor, 'cursor')
        let cancelled = false;
        if (cursor) {
            let prefixRayy = prefix.split('')
            for (let idx = 0; idx < prefixRayy.length; idx++) {
                let char = prefixRayy[idx];
                if ((cursor.chdNodes)[char]) {
                    cursor = cursor.chdNodes[char];
                } else {
                    cancelled = true;
                    return []
                }
            }
            if (cancelled === false) {
                return reduceTree([], cursor);
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Species);