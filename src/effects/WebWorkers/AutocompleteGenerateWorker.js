export default function MyWorker(args) {
    console.log('hello')
    postMessage('howdy')
    let onmessage = e => { // eslint-disable-line no-unused-vars
        // Write your code here...
        console.log('hello from worker');
        postMessage("Response");
    };
}