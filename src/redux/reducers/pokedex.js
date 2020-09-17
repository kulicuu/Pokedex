import { POKEDEX_CRITERIA, SET_FILTER, INITIALIZE, ACK_EFFECT, DATA, AUTOCOMPLETE_GENERATE } from "../actionTypes";
const c = console.log.bind(console);
const initialState = {
  allIds: [],
  byIds: {},
  species: {},
  locations: {},
  locationAreas: {},
  moves: {},
  abilities: {},
};




const reducerArq = {};


// Dev-Note:  It's going to go smoother if we wait for the full population
// of a data set before sending it to be processed.  It is possible to do 
// it in a streaming way with batches but unnecessarily complicated
// for this application.

reducerArq.DATA = function(state, action, effectsQueue) {
    state = processInitialData(action.payload, state);
    if (action.payload.finished === true) {
        effectsQueue.push({
            type: AUTOCOMPLETE_GENERATE,
            payload: {
                type: "Species",
                payload: state.species
            }
        })
    }


    return state
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
        case "Species": {
            let species = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.species);
            return {
                ...state,
                species
            }  
        }
        case "Abilities": {
            let { data, dataType } = payload;
            let abilities = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.abilities);
            return {
                ...state,
                abilities
            }
        }
        case "Locations": {
            let { data, dataType } = payload;
            let locations = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.locations);
            return {
                ...state,
                locations
            }
        }
        case "Moves": {
            let { data, dataType } = payload;
            let moves = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.moves);
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
        case "Locations": {
            let { data, dataType } = payload;
            let locations = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.locations);
            return {
                ...state,
                locations
            }
        }
        default:
            return state;
    }
}
