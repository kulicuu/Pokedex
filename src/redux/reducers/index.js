import { combineReducers } from "redux";
import pokedexPrecursor from "./pokedex";


export default function rootReducerPrecursor (effectsQueue) {
    let pokedex = pokedexPrecursor(effectsQueue)
    return combineReducers({ pokedex });
}