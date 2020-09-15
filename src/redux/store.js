import { createStore } from "redux";
import rootReducerPrecursor from "./reducers";


export default function storePrecursor (effectsQueue) {
    let rootReducer = rootReducerPrecursor(effectsQueue);
    return createStore(rootReducer);

}
