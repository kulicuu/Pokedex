import React from 'react';
import { connect } from 'react-redux';
import './Species.css';
import Card from './Card';
import UmbraCard from './UmbraCard';
import UmbraSet from './UmbraSet';

const c = console.log.bind(console);
const _ = require('lodash');



class Species extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredSpecies: []
        }
    }

    render() {
        let filterTreeLoading = this.props.filterTree === undefined;
        return (
            <div className="container-fluid">
                <div className='container-fluid'>
                <h2> Species </h2>
                <div className='container-fluid'>
                    <UmbraSet/>
                    <div className='container'>
                        <input
                            disabled={filterTreeLoading}
                            type="text"
                            placeholder="Species"
                            onChange= {(e) => {
                                this.setState({
                                    filteredSpecies: searchPrefixTree(e.target.value, this.props.filterTree)
                                })
                            }}
                        />
                    </div>
                        <div className='containerSeven'>
                            {                    
                            filterTreeLoading?
                                false
                            :
                                this.state.filteredSpecies.map((specie, idx) => {
                                    return <Card 
                                        key={`filteredSpecies:${idx}`}
                                        specie={specie}
                                    />
                                })
                            }
                        </div> 

                </div>  


                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {

    return  {filterTree: state.pokedex.filterTrees.Species }
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


export default connect(mapStateToProps, mapDispatchToProps)(Species);