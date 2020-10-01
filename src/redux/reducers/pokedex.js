

import { POKEDEX_CRITERIA, SET_FILTER, INITIALIZE, ACK_EFFECT, DATA, AUTOCOMPLETE_GENERATE } from "../actionTypes";
const _ = require('lodash');
const c = console.log.bind(console);
const initialState = {
    selectedSpecies: null,
    images: {
        attributes: {},
        abilities: {},
        locations: {},
        species: {},
        moves: {}
    },
    details: {
        attributes: {},
        abilities: {},
        locations: {},
        species: {},
        moves: {}
    },
    filterTrees: {},
        attributes: {
        abilities: {},
        locations: {},
        species: {},
        moves: {},
    },
    filteredAttributes: {
        abilities: [],
        locations: [],
        species: [],
        moves: []
    }
};


const reducerArq = {};



reducerArq.setSelectedSpecies = function(state, action, effectsQueue) {
    let { speciesName } = action.payload;
    return {
        ...state,
        selectedSpecies: speciesName
    }
}

reducerArq.focusImage = function(state, action, effectsQueue) {
    let { imgSrc, attributeType, attributeKey } = action.payload;
    return {
        ...state,
        images: {
            ...state.images,
            [attributeType]: {
                ...state.images[attributeType],
                [attributeKey]: imgSrc
            }
        }
    }
}


reducerArq.detailsResponse = function(state, action, effectsQueue) {
    let { data, attributeKey, attributeType } = action.payload;
    return {
        ...state,
        details: {
            ...state.details,
            [attributeType]: {
                ...state.details[attributeType],
                [attributeKey]: data
            }
        }
    }
}


reducerArq.getDetails = function(state, action, effectsQueue) {
    let { attributeType, attributeKey, uri } = action.payload;
    effectsQueue.push({
        type: 'getDetails',
        payload: {
            attributeType,
            attributeKey,
            uri
        }
    })
    return {
        ...state,
        detailedSpeciesFocus: 'loading'
    }
}


reducerArq.filterAttribute = function(state, action, effectsQueue) {
    let { attributeType, prefix } = action.payload;
    if (state.filterTrees[attributeType]) {
        let filteredAtts = searchPrefixTree(prefix, state.filterTrees[attributeType]);
        return {
            ...state,
            filteredAttributes: {
                ...state.filteredAttributes,
                [attributeType]: filteredAtts
            }
        }
    } else {
        return state
    }
}


reducerArq.treeBuildComplete = function(state, action, effectsQueue) {
    c("in treeBuildComplete with action", action.payload);
    let {dataType, tree} = action.payload;
    // TODO: change dataType to attributeType for consistency, and get rid of the capitalized
    // attributeType and kludgeMap.
    return {
        ...state,
        filterTrees: {
            ...state.filterTrees,
            [dataType]: tree
        }
    }
}


// Dev-Note:  It's going to go smoother if we wait for the full population
// of a data set before sending it to be processed.  It is possible to do 
// it in a streaming way with batches but unnecessarily complicated
// for this application.

reducerArq.DATA = function(state, action, effectsQueue) {
    let { dataType } = action.payload;
    let newState = processInitialData(action.payload, state);
    if (action.payload.finished === true) {
        effectsQueue.push({
            type: AUTOCOMPLETE_GENERATE,
            payload: {
                type: 'autocompleteTreeBuild',
                payload: {
                    dataType,
                    data: state[dataType]
                }
            }
        })
    }
    return newState
}


export default function PokedexPrecursor(effectsQueue) {
    return function(state = initialState, action) {
        if (Object.keys(reducerArq).includes(action.type)) {
            return reducerArq[action.type](state, action, effectsQueue)
        } else {
            c("No-op in updates/reducers with type:", action.type);
            return state
        }
    }


}


function processInitialData(payload, state) {
    let data = payload.data;
    let dataType = payload.dataType;
    switch (dataType) {
        // TODO change to attributeType lowercased for consistency, also , 
        case "species": {
            let species = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.attributes.species);
            return {
                ...state,
                species
            }  
        }
        case "abilities": {
            let { data, dataType } = payload;
            let abilities = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.attributes.abilities);
            return {
                ...state,
                abilities
            }
        }
        case "locations": {
            let { data, dataType } = payload;
            let locations = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.attributes.locations);
            return {
                ...state,
                locations
            }
        }
        case "moves": {
            let { data, dataType } = payload;
            let moves = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.attributes.moves);
            return {
                ...state,
                moves
            }
        }
        // case "LocationAreas": {
        //     let { data, dataType } = payload;
        //     let locationAreas = data.reduce((acc, value, id) => {
        //         acc[value.name] = value;
        //         return acc
        //     }, state.locationAreas);
        //     return {
        //         ...state,
        //         locationAreas
        //     }
        // }
        case "locations": {
            let { data, dataType } = payload;
            let locations = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.attributes.locations);
            return {
                ...state,
                locations
            }
        }
        default:
            return state;
    }
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


function reduceTree(acc, tree) {
    if (acc.indexOf(tree.matchWord) === -1) {
        acc = [].concat(acc, tree.matchWord);
    }
    return _.reduce(tree.chdNodes, (acc2, node, prefix) => {
        return reduceTree(acc2, node)
    }, acc);
}