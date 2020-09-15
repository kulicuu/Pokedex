
// I'm copying from my own work here:
// https://github.com/kulicuu/graph_radar/blob/master/server-side/prefix_tree/worker_prefix_tree.coffee

const c = console.log.bind(console);




function mapPrefixToMatch ({ dictionary, prefix }) {
    let candides = []
    for (let idx = 0; idx < dictionary.length; idx++) {
        let word = dictionary[idx];
        if (word.indexOf(prefix) === 0) {
            candides.push(word);
        }
    }
    // for this application i want to return all potential matches
    return candides;

    // if (candides.length > 1) {
    //     return breakTies({ candides })
    // } else {
    //     return candides.pop()
    // }

}

function sendProgress({ percCount, jobId }) {
    postMessage({
        type: 'progressUpdate',
        payload: {
            percCount,
            jobId
        }
    })
}


const api = {}

const prefixTrees = {}


api.buildTree = function (payload) {
    let counter = 0;
    let { dctnBlob, jobId, treeId } = payload;

    let rawRayy = dctnBlob.split('\n');

    let lenRawRayy = rawRayy.length

    let percCount = lenRawRayy = 100;

    let tree = {
        chdNodes: {},
        prefix: ''
    }


    for (let idx = 0; idx < dctnBlob.length; idx++) {
        let word = dctnBlob[idx];
        c(word, "on");
        let cursor = tree;
        let prefix = '';
        if (word.length >= 1) {
            counter++;
            let perc = counter / percCount;
            if (Math.floor(counter % percCount) === 0) {
                sendProgress({
                    percCount: Math.floor(perc),
                    jobId,
                    treeId
                })
            }
            for (let jdx = 0; jdx < word.length; jdx++) {
                let char = word[jdx];
                prefix+= char;
                if (!Object.keys(cursor.chdNodes).includes(char)) {
                    cursor.chdNodes[char] = {
                        matchWord: mapPrefixToMatch({
                            prefix,
                            dictionary: rawRayy,
                        }),
                        prefix,
                        chdNodes: {}
                    }
                }
                cursor = cursor.chdNodes[char];
            }
        }
    }
    prefixTrees[treeId] = tree;
    c('done tree build');
    sendProgress({
        percCount: 100,
        jobId,
        treeId
    })
}





export default function AutocompleteGenerateWorker(args) {
    console.log('hello')
    postMessage('howdy')
    onmessage = e => { // eslint-disable-line no-unused-vars
        // Write your code here...
        console.log('hello from worker');
        postMessage("Response");
    };
}