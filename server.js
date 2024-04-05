
console.log("Starting Node.js")

// In node.js we get access to the global object.
console.log(global)


const os = require('os')
const path = require('path')
const math = require('./math')

console.log(math.add(10,15));


// console.log(os.type());
// console.log(os.version());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.parse(__filename))