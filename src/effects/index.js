

import { INITIALIZE, DATA, ACK_EFFECT } from "../redux/actionTypes";


const c = console.log.bind(console);


export default function(store) {
    store.subscribe(trafficEffects);
    store.dispatch({ type: INITIALIZE, payload: "0" });
    function trafficEffects() {
        // c(store.getState().pokedex.effectsStack, 'effectsStack');
        let effectsStack = store.getState().pokedex.effectsStack;
        Object.keys(effectsStack).map((effectType, idx) => {
            store.dispatch({ type: ACK_EFFECT, payload: effectType });
            effects(effectType, effectsStack[effectType], store);
        });
    }
}


function cursiveFetchAbilities(uri, store) {
    fetch(uri)
    .then(response => response.json())
    .then(data => {
        store.dispatch({ type: DATA, payload: { dataType: "Abilities", data } });
        if (data.next) {
            // c('have next', data.next);
            cursiveFetchAbilities(data.next, store);
        }
    })
}


function cursiveFetchEvolutionChains(url, store) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Promise.all(data.results.map((value) => {
            return new Promise((resolve, reject) => {
                fetch(value.url)
                .then(response2 => response2.json())
                .then(data => resolve(data))
            })
        }))
        .then((arq) => {
            store.dispatch({ type: DATA, payload: { dataType: "EvolutionChains", data: arq } })
        })
        if (data.next) cursiveFetchEvolutionChains(data.next, store);
    })
}



function cursiveFetchLocations(url, store) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Promise.all(data.results.map((value) => {
            return new Promise((resolve, reject) => {
                fetch(value.url)
                .then(response2 => response2.json())
                .then(data => resolve(data))
            })
        }))
        .then((arq) => {
            store.dispatch({ type: DATA, payload: { dataType: "Locations", data: arq } })
        })
        if (data.next) cursiveFetchLocations(data.next, store);
    })
}


function cursiveFetchMoves(url, store) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Promise.all(data.results.map((value) => {
            return new Promise((resolve, reject) => {
                fetch(value.url)
                .then(response2 => response2.json())
                .then(data => resolve(data))
            })
        }))
        .then((arq) => {
            store.dispatch({ type: DATA, payload: { dataType: "Moves", data: arq } })
        })
        if (data.next) cursiveFetchMoves(data.next, store);
    })
}


function cursiveFetchSpecies(url, store) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Promise.all(data.results.map((value) => {
            return new Promise((resolve, reject) => {
                fetch(value.url)
                .then(response2 => response2.json())
                .then(data => resolve(data))
            })
        }))
        .then((arq) => {
            store.dispatch({ type: DATA, payload: { dataType: "Species", data: arq } })
        })
        if (data.next) cursiveFetchSpecies(data.next, store);
    })
}


function initialize(store) {
    // fetch("https://pokeapi.co/api/v2/generation/8")
    // .then(response => response.json())
    // .then(data => {
    //     store.dispatch({ type: DATA, payload: { dataType: "Generation8", data } });
    // })

    // cursiveFetchAbilities("https://pokeapi.co/api/v2/ability", store);
    // cursiveFetchEvolutionChains("https://pokeapi.co/api/v2/evolution-chain/", store);

    // fetch("https://pokeapi.co/api/v2/pokemon-color/")
    // .then(response => response.json())
    // .then(data => {
    //     store.dispatch({ type: DATA, payload: { dataType: "Colors", data } });
    // });

    // fetch("https://pokeapi.co/api/v2/evolution-trigger/")
    // .then(response => response.json())
    // .then(data => {
    //     store.dispatch({ type: DATA, payload: { dataType: "EvolutionTrigger", data } });
    // })

    // fetch("https://pokeapi.co/api/v2/gender/")
    // .then(response => response.json())
    // .then(data => {
    //     c(data, 'data')
    //     store.dispatch({ type: DATA, payload: { dataType: "Genders", data } });
    // })

    // fetch("https://pokeapi.co/api/v2/location-area/")
    // .then(response => response.json())
    // .then(data => {
    //     store.dispatch({ type: DATA, payload: { dataType: "LocationArea", data } });
    // })

    // cursiveFetchLocations("https://pokeapi.co/api/v2/location/", store);
    // cursiveFetchMoves("https://pokeapi.co/api/v2/move/", store);
    cursiveFetchSpecies("https://pokeapi.co/api/v2/pokemon-species", store);
}



function effects(effectType, effect, store) {
    switch (effectType) {
        case INITIALIZE: {
            initialize(store);
        }
    }
}
