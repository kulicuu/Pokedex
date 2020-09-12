
import { INITIALIZE, DATA, ACK_EFFECT } from "../redux/actionTypes";


const c = console.log.bind(console);

var counter = 0;

export default function(store) {

    store.subscribe(trafficEffects);

    store.dispatch({ type: INITIALIZE, payload: "0" });

    function trafficEffects() {
        c(store.getState().pokedex.effectsStack, 'effectsStack');
        let effectsStack = store.getState().pokedex.effectsStack;
        Object.keys(effectsStack).map((effectType, idx) => {
            store.dispatch({ type: ACK_EFFECT, payload: effectType });
            effects(effectType, effectsStack[effectType], store);
        });



    }

}



function effects(effectType, effect, store) {
    switch (effectType) {
        case INITIALIZE: {
            fetch("https://pokeapi.co/api/v2/generation/3/")
            .then(response => response.json())
            .then(data => {
                c(data, 'data')
                store.dispatch({ type: DATA, payload: data });
            })
        }

    }


}
