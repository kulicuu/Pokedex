import { POKEDEX_CRITERIA, SET_FILTER, INITIALIZE, ACK_EFFECT, DATA } from "../actionTypes";
const c = console.log.bind(console);
const initialState = {
  effectsStack: {},
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  // c(action, 'action');
  switch (action.type) {
      case DATA: {
          c(action.payload, 'data33434')
          return {
            ...state
          }
      }
      case ACK_EFFECT: {
          let effectsStack = state.effectsStack;
          delete effectsStack[action.payload]
          // c(effectsStack)
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
