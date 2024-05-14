// an async function will always return a promise no matter what kind
// of data type is returned.


// async and await are used to handle promises.

// await can only be used inside async function.


// async function getData(){
//     return "John Doe"
// }
// const data = getData()
// console.log(data); // returned string wrapped in a promise.
// data.then(function(msg){
//     console.log(msg);
// })

const demoPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Promise value Resolved");
  }, 5000);
});

const p1_5000 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Promise value Resolved");
    }, 5000);
  });

  const p2_10000 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Promise value Resolved");
    }, 10000);
  });


/* Illustrate diff between aysnc/await and nomal .then resolution of promise  */  

function promiseResolver1() {
  demoPromise.then((res) => console.log(res)); // does not wait for promise resolution continues execution.
  console.log("Message from non-async promise resolver");
}

async function promiseResolver2() {
  const value = await demoPromise; // waits until promise resolved.( does not technically wait only appears so)
  console.log(value);              // in reality the method is suspended(removed from call stack) until it's promise is resolved.
  console.log("Message from async promise resolver");
}

//run promiseResolver1 and promiseResolver2 to see diff.
// promiseResolver1()

/* *****  */

async function magic_p2_p1(){
    const v1 = await p2_10000
    console.log("p2 promise resolved");
    const v2  = await p1_5000
    console.log("p1 promise resolved");
}

async function magic_p1_p2(){
    const v1 = await p1_5000
    console.log("p2 promise resolved");
    const v2  = await p2_10000
    console.log("p1 promise resolved");
}

//magic_p1_p2()
magic_p2_p1()




