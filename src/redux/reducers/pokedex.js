import { POKEDEX_CRITERIA, SET_FILTER, INITIALIZE, ACK_EFFECT, DATA } from "../actionTypes";
const c = console.log.bind(console);
const initialState = {
  effectsStack: {},
  allIds: [],
  byIds: {},
  species: {},
  locations: {},
  locationAreas: {},
  moves: {},
  abilities: {},
};



function processInitialData(payload, state) {
    let data = payload.data;
    let dataType = payload.dataType;
    switch (dataType) {
        case "Species": {
            let species = data.reduce((acc, value, id) => {
                acc[value.name] = value;
                return acc
            }, state.species);
            // c(species, 'exited?')
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











export default function(state = initialState, action) {

  switch (action.type) {
      case DATA: {
          return processInitialData(action.payload, state);
      }
      case ACK_EFFECT: {
          let effectsStack = state.effectsStack;
          delete effectsStack[action.payload]
          return {
              ...state,
              effectsStack
          }
      }
      case INITIALIZE: {
          return {
            ...state,
            effectsStack: { ...state.effectsStack, INITIALIZE: { payload: null } }
          }
      }
      case POKEDEX_CRITERIA: {
        const { id, content } = action.payload;
        return {
          ...state,
          allIds: [...state.allIds, id],
          byIds: {
            ...state.byIds,
            [id]: {
              content,
              completed: false
            }
          }
        };
      }
      case SET_FILTER: {
        const { id } = action.payload;
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [id]: {
              ...state.byIds[id],
              completed: !state.byIds[id].completed
            }
          }
        };
      }
      default:
        return state;
    }
}
