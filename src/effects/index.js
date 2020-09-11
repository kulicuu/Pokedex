
import { INITIALIZE } from "../redux/actionTypes";


const c = console.log.bind(console);



export default function(store) {

    store.subscribe(trafficEffects);

    store.dispatch({ type: INITIALIZE, payload: "0" });

    function trafficEffects() {
        c(store.getState().pokedex.effectsStack, 'effectsStack');

        store.getState().pokedex.effectsStack.map((effect, idx) => {
            effects(effect, store);
        });

    }

}



function effects(effect, store) {
    switch (effect.type) {
        case INITIALIZE: {
            fetch("https://pokeapi.co/api/v2/generation/3/")
            .then(response => response.json())
            .then(data => {
                c(data, 'data')
            })
        }

    }


}
