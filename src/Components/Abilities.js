import React from 'react';
import { connect } from 'react-redux';
import './Abilities.css'

const c = console.log.bind(console);
const _ = require('lodash');

class Abilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredAbilities: []
        }
    }

    render() {
        let filterTreeLoading = this.props.filterTree === undefined;
        return (
            <div className="Abilities">
                <input 
                    disabled={filterTreeLoading}
                    type="text"
                    placeholder="Abilities"
                    onChange= {(e) => {
                        this.setState({
                            filteredAbilities: searchPrefixTree(e.target.value, this.props.filterTree)
                        })
                    }}
                />
                <ul>
                    {this.state.filteredAbilities.map((ability, idx) => {
                        return <li key={`filteredAbilites:${idx}`}> {ability} </li>
                    })}
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    let { abilities } = state.pokedex;
    let props = Object.keys(abilities).reduce((acc, key, idx) => {
        acc[key] = abilities[key];
        return acc
    }, {});
    return { ...props, filterTree: state.pokedex.filterTrees.Abilities}
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
    if (prefix.length === 0) {
        return []
    } else {
        let cursor = filterTree;
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



export default connect(mapStateToProps, mapDispatchToProps)(Abilities);