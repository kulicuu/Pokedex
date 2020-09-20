

import { INITIALIZE, DATA, ACK_EFFECT, AUTOCOMPLETE_GENERATE } from "../redux/actionTypes";
import workerize from 'workerize';
import AutocompleteGenerateWorker from './WebWorkers/AutocompleteGenerateWorker';


const acgw = workerize(AutocompleteGenerateWorker);
const c = console.log.bind(console);


const effectsArq = {};




effectsArq.AUTOCOMPLETE_GENERATE = function (effect, store) {
    let { type, payload } = effect;
    c('payload in effect', payload)
    if (window.Worker) {
        acgw.onmessage = (e) => {
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
};


effectsArq.INITIALIZE = function (effect, store) {

    // DEVELOPMENT MODE comment this to avoid bombarding the API endpoint:
    
    // fetch("https://pokeapi.co/api/v2/generation/8")
    // .then(response => response.json())
    // .then(data => {
    //     store.dispatch({ type: DATA, payload: { dataType: "Generation8", data } });
    // })

    
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
    //     // c(data, 'data')
    //     store.dispatch({ type: DATA, payload: { dataType: "Genders", data } });
    // })

    // fetch("https://pokeapi.co/api/v2/location-area/")
    // .then(response => response.json())
    // .then(data => {
    //     store.dispatch({ type: DATA, payload: { dataType: "LocationAreas", data } });
    // })

    // cursiveFetchLocations("https://pokeapi.co/api/v2/location/", store);
    // cursiveFetchMoves("https://pokeapi.co/api/v2/move/", store);

    // cursiveFetchAbilities("https://pokeapi.co/api/v2/ability", store);
    // cursiveFetchEvolutionChains("https://pokeapi.co/api/v2/evolution-chain/", store);
    cursiveFetchSpecies("https://pokeapi.co/api/v2/pokemon-species", store);

};


const acgwResponseAPI = {};


acgwResponseAPI.treeBuildComplete = function (payload, store) {
    // c("build tree complete")
    store.dispatch({
        type: "treeBuildComplete",
        payload
    })

}


if (window.Worker) {
    acgw.onmessage = (e) => {
        let { type, payload } = e.data;
        if (Object.keys(acgwResponseAPI).includes(type)) {
            acgwResponseAPI[type](payload);
        } else {
            c("No-Op in acgwResponseAPI with type:", type);
        }
    }
}




export default function effectsPrecursor(store) {
    return function effects(effectsQueue) {
        effectsQueue.map((effect, idx) => {
            let eType = effect.type;
            c('effect in main effect function', effect)
            effectsQueue.splice(idx, 1);
            if (Object.keys(effectsArq).includes(eType)) {
                effectsArq[eType](effect, store);
            } else {
                c("no-op in effects with eType:", eType);
            }
        })
    }

}

var devCounterAbilities = 0
function cursiveFetchAbilities(url, store) {
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
            if (data.next) {
                store.dispatch({
                    type: DATA,
                    payload: {
                        dataType: "abilities",
                        finished: false,
                        data: arq
                    }
                })
                cursiveFetchAbilities(data.next, store);
            } else {
                store.dispatch({
                    type: DATA,
                    payload: {
                        dataType: "abilities",
                        finished: true,
                        data: arq
                    }
                })
            }
        }) 
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
            store.dispatch({ type: DATA, payload: { dataType: "vvolutionChains", data: arq } })
        })
        if (data.next) cursiveFetchEvolutionChains(data.next, store);
    })
}

var devCounterLocations = 0;
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
            if (data.next) {
                store.dispatch({
                    type: DATA,
                    payload: {
                        dataType: "locations",
                        finished: false,
                        data: arq
                    }
                })
                cursiveFetchLocations(data.next, store);
            } else {
                store.dispatch({
                    type: DATA,
                    payload: {
                        dataType: "locations",
                        finished: true,
                        data: arq
                    }
                })
            }
        }) 
    })
}


var devCounterMoves = 0;
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
            // devCounterMoves++;
            // if (data.next && devCounterMoves < 10) {
            if (data.next) {
                store.dispatch({
                    type: DATA,
                    payload: {
                        dataType: "moves",
                        finished: false,
                        data: arq
                    }
                })
                cursiveFetchMoves(data.next, store);
            } else {
            // } else if (devCounterMoves===10) {
                store.dispatch({
                    type: DATA,
                    payload: {
                        dataType: "moves",
                        finished: true,
                        data: arq
                    }
                })
            }
        }) 
    })
}

// var devCounterSpecies = 0;
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
            // c('????')
            // devCounterSpecies++;
            // if (data.next && devCounterSpecies < 10) {
            // Development mode ^^ to limit API usage
            if (data.next) {
                store.dispatch({ 
                    type: DATA, 
                    payload: { 
                        dataType: "species",
                        finished: false,
                        data: arq 
                    } 
                })
                cursiveFetchSpecies(data.next, store);    
            // } else if (devCounterSpecies===10) {
            // Development mode ^^
            } else {
                store.dispatch({ 
                    type: DATA, 
                    payload: { 
                        dataType: "species",
                        finished: true,
                        data: arq 
                    } 
                })
            } 
        })
    })
}







