
// I'm copying from my own work here:
// https://github.com/kulicuu/graph_radar/blob/master/server-side/prefix_tree/worker_prefix_tree.coffee

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
        return candides[0];
    }


    function bulidTree (payload) {
        let { dctnRayy, jobId, treeId } = payload;
        let tree = {
            chdNodes: {},
            prefix: ''
        }
        for (let idx = 0; idx < dctnRayy.length; idx++) {
            let word = dctnRayy[idx];
            // c("buildTree on word:", word);
            let cursor = tree;
            let prefix = '';
            if (word.length >= 1) {
                for (let jdx = 0; jdx < word.length; jdx++) {
                    let char = word[jdx];
                    prefix+= char;
                    if (!Object.keys(cursor.chdNodes).includes(char)) {
                        cursor.chdNodes[char] = {
                            matchWord: mapPrefixToMatch({
                                prefix,
                                dictionary: dctnRayy,
                            }),
                            prefix,
                            chdNodes: {}
                        }
                    }
                    cursor = cursor.chdNodes[char];
                }
            }
        }
        c('Tree build finished.');
        return tree
    }

    const api = {}


    api.autocompleteTreeBuild = function (payload) {
        // c(payload, 'payload')
        let { dataType, data } = payload
        let dctnRayy = Object.keys(data);
        let tree = bulidTree({
            dctnRayy,
        })
        postMessage({
            type: 'treeBuildComplete',
            payload: { dataType, tree }
        })
    }

    onmessage = e => {
        let { type, payload } = e.data;
        api.autocompleteTreeBuild(payload);


        // if (Object.keys(api).includes(type)) {
        //     // kludge
        //     api.autocompleteTreeBuild(payload);
        // } else {
        //     c("no-op in AutocompleteGenerateWorker with type", type);
        // }
    };
}