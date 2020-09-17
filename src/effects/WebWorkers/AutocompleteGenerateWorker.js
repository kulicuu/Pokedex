
// I'm copying from my own work here:
// https://github.com/kulicuu/graph_radar/blob/master/server-side/prefix_tree/worker_prefix_tree.coffee



// Dev-Note:  It's going to go smoother if we wait for the full population
// of a data set before sending it to be processed.  It is possible to do 
// it in a streaming way with batches but unnecessarily complicated
// for this application.

export default function AutocompleteGenerateWorker(args) {
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

    function sendProgress({ percCount, jobId, tree }) {
        postMessage({
            type: 'progressUpdate',
            payload: {
                percCount,
                jobId,
                tree
            }
        })
    }


    function bulidTree (payload) {
        let counter = 0;

        c(payload)

        let { dctnBlob, jobId, treeId } = payload;

        // let rawRayy = dctnBlob.split('\n');
        let rawRayy = dctnBlob; // sic, fix

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
                // if (Math.floor(counter % percCount) === 0) {
                //     sendProgress({
                //         percCount: Math.floor(perc),
                //         jobId,
                //         treeId
                //     })
                // }
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
        c('tree is', tree);
        c('done tree build');
        sendProgress({
            percCount: 100,
            jobId,
            treeId,
            tree
        })
    }


    const api = {}

    const prefixTrees = {}


    api.Species = function (payload) {
        c('hi', payload);
        let dctnBlob = Object.keys(payload);
        bulidTree({
            dctnBlob,
            jobId: "aaa",
            treeId: "bbb"
        })

    }






    onmessage = e => {
        // c(e.data)
        let { type, payload } = e.data;
        if (Object.keys(api).includes(type)) {
            api[type](payload);
        } else {
            c("no-op in AutocompleteGenerateWorker with type", type);
        }
    };
}