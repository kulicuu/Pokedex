export default function testWorker(args) {
    console.log('hello')
    postMessage('howdy')
    onmessage = (e) => { // eslint-disable-line no-unused-vars
        // Write your code here...
        console.log('hello from worker');
        postMessage("Response");
    };
}