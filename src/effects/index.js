

import { INITIALIZE, DATA, ACK_EFFECT, AUTOCOMPLETE_GENERATE } from "../redux/actionTypes";
import workerize from 'workerize';
import AutocompleteGenerateWorker from './WebWorkers/AutocompleteGenerateWorker';


const acgw = workerize(AutocompleteGenerateWorker);
const c = console.log.bind(console);


const effectsArq = {};


effectsArq.AUTOCOMPLETE_GENERATE = function (effect, store) {
    autocompleteGenerate(effect.payload, store);
};


effectsArq.INITIALIZE = function (effect, store) {
    initialize(store);
};


const acgwResponseAPI = {};


acgwResponseAPI.treeBuildComplete = function (payload, store) {
    store.dispatch({
        type: "treeBuildComplete",
        payload
    })

}


if (window.Worker) {
    acgw.onmessage = (e) => {
        c('have message back', e.data)
        let { type, payload } = e.data;
        if (Object.keys(acgwResponseAPI).includes(type)) {
            acgwResponseAPI[type](payload);
        } else {
            c("No-Op in acgwResponseAPI with type:", type);
        }
    }
}


function autocompleteGenerate(payload, store) {
    if (window.Worker) {
        acgw.onmessage = (e) => {
            c('have message back', e.data)
            let { type, payload } = e.data;
            if (Object.keys(acgwResponseAPI).includes(type)) {
                acgwResponseAPI[type](payload, store);
            } else {
                c("No-Op in acgwResponseAPI with type:", type);
            }
        }
        acgw.postMessage(payload)
    } else {
        c('no worker')
    }
}


export default function effectsPrecursor(store) {
    return function effects(effectsQueue) {
        effectsQueue.map((effect, idx) => {
            let eType = effect.type;
            effectsQueue.splice(idx, 1);
            if (Object.keys(effectsArq).includes(eType)) {
                effectsArq[eType](effect, store);
            } else {
                c("no-op in effects with eType:", eType);
            }
        })
    }

}


function cursiveFetchAbilities(uri, store) {
    fetch(uri)
    .then(response => response.json())
    .then(data => {
        store.dispatch({ type: DATA, payload: { dataType: "Abilities", data: data.results } });
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


var counter = 0;
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
            counter++;
            if (data.next && counter < 2) {
            // Development mode ^^
            // if (data.next) {
                store.dispatch({ 
                    type: DATA, payload: { 
                        dataType: "Species",
                        finished: false,
                        data: arq 
                    } 
                })
                cursiveFetchSpecies(data.next, store);    
            } else if (counter===2) {
            // Development mode ^^
            // } else {
                store.dispatch({ 
                    type: DATA, payload: { 
                        dataType: "Species",
                        finished: true,
                        data: arq 
                    } 
                })
            } 
        })
    })
}


function initialize(store) {

    // DEVELOPMENT MODE comments this 
    
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
    //     store.dispatch({ type: DATA, payload: { dataType: "LocationAreas", data } });
    // })

    // cursiveFetchLocations("https://pokeapi.co/api/v2/location/", store);
    // cursiveFetchMoves("https://pokeapi.co/api/v2/move/", store);
    cursiveFetchSpecies("https://pokeapi.co/api/v2/pokemon-species", store);
}




