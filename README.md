![26850584_10156186800336579_1585065027752569016_o](https://github.com/Sagar-Chowdhury/LearningNode/assets/76145064/ea772230-e301-4852-93a0-73c864c88bd1)

### Important Points to remember

1. Concept of versioning in Npm [https://docs.npmjs.com/about-semantic-versioning ]
2. Server side rendering is faster than cliet side rendering , but former is useful only when client is Browser.
3. Concept of **Middleware** in node.js [https://expressjs.com/en/guide/using-middleware.html]
4. (`Docker Notes`) [https://github.com/Sagar-Chowdhury/Docker-Notes]
5. (`Rabbit Mq`) [https://github.com/Sagar-Chowdhury/RabbitMq-Notes]

![image](https://github.com/Sagar-Chowdhury/LearningNode/assets/76145064/1aef645d-ff08-46e9-a1b9-6eaa621faf36)


**Express.js: The Minimalist Web Framework** 

* **Core Philosophy:**  Express is a lightweight, flexible, and unopinionated web framework for Node.js. It provides the essentials for building web servers and APIs without imposing a rigid structure.
* **Key Features:**
    * **Routing:** Powerful system for mapping HTTP requests (GET, POST, etc.) to specific handler functions.
    * **Middleware:** Functions that have access to the request and response objects, allowing you to modify or process data before it reaches your route handlers.
    * **Templating Support:**  While it doesn't enforce a specific templating engine, Express seamlessly integrates with popular engines like EJS, Pug, and Handlebars.
    * **Error Handling:** Provides mechanisms for centralized error handling within your application.

**MVC (Model-View-Controller) Architectural Pattern**

* **Separation of Concerns:** The core principle of MVC is to organize code into three distinct layers:
    * **Model:** Represents your data and business logic. Interacts with databases (MongoDB, SQL, etc.).
    * **View:** Responsible for UI representation. Generates HTML output, often using templating engines.
    * **Controller:** Handles HTTP requests, interacts with models to process data, and selects the appropriate view to render.

**Express and MVC: A Perfect Fit**

* **Flexibility:** Express doesn't force you into a strict MVC structure. However, its design aligns well with implementing MVC principles.
* **Common Structure:** Here's how a typical Express + MVC setup might look:
    * **routes/**: Contains your controllers.
    * **models/**: Houses your Mongoose models (or other database interaction logic).
    * **views/**: Stores your EJS templates (or those for your chosen engine).

**Additional Benefits of Express + MVC**

* **Maintainability:** Clear separation makes the codebase easier to manage and scale.
* **Testability:** Independent layers can be tested in isolation.
* **Collaboration:** Developers with specialized skills can focus on their respective areas (frontend, backend, database).

### Internal Working Deep-Dive

*Node JS Single Threaded Event Loop Model*
As we have already discussed, Node JS applications uses “Single Threaded Event Loop Model” architecture to handle multiple concurrent clients. There are many web application technologies like *JSP, Spring MVC, ASP.NET, HTML, Ajax, jQuery* etc. But all these technologies follow **“Multi-Threaded Request-Response”** architecture to handle multiple concurrent clients. We are already familiar with “Multi-Threaded Request-Response” architecture because it’s used by most of the web application frameworks.

### (`Traditional Web Application Processing Model` - `**Multi-Threaded Request-Response Model**`)

Here's a point-wise summary of the **Multi-Threaded Request-Response Model** :

**Key Points**

* **Traditional Model:**  Prevalent in web applications built without Node.js.
* **Stateless:**  Based on HTTP, which doesn't maintain state between requests.
* **Multiple Threads:** Used for handling concurrent client requests.  

**Processing Steps**

1. **Client Request:** Client sends a request to the web server.
2. **Thread Pool:** Server maintains a pool of threads to serve requests.
3. **Infinite Loop:** Server waits for incoming requests.
4. **Request Handling:** Server receives a request.
5. **Thread Assignment:** A thread from the pool is assigned to the request.
6. **Thread Processing:** The thread performs the following:
   * Reads the client request
   * Processes the request
   * Performs blocking I/O operations (if needed)
   * Prepares the response
7. **Response:** Thread sends the response to the web server.
8. **Server Delivery:** Server sends the response to the client.
9. **Repeat:**  Server loops back, handling requests for all clients.


![image](https://github.com/Sagar-Chowdhury/LearningNode/assets/76145064/921a494c-6c7d-4d10-bd23-b14f328394e5)

**Diagram Dynamics**

* **Concurrent Requests:** The web server handles multiple client requests simultaneously.
* **Thread Pool:** The server has a limited pool of threads to serve requests.
* **Thread Assignment:** Each incoming request is assigned a thread from the pool.
* **Processing:**
   * Threads handle request reading, processing, and response preparation.
   * Blocking I/O operations can delay a thread's completion.
* **Resource Management:**
   * If all threads in the pool are busy, new requests must wait.
   * Threads need to release resources before becoming available again.  

**Drawbacks of the Multi-Threaded Request/Response Model**

* **Scalability Limits:**  Handling many concurrent requests can exhaust the thread pool, causing delays.
* **Resource Overhead:** Each thread consumes memory and other resources.
* **Request Waiting:** Clients may wait for available threads, especially if the pool is small.
* **Blocking I/O Inefficiency:** Blocking operations stall threads, slowing down the overall process.




### (`Node JS Architecture - Single Threaded Event Loop Model` - **Working and Functionality** )

Let's break down the *JavaScript callback mechanism*, which is the foundation of Node.js's asynchronous handling:

**Core Concepts**

* **Functions as First-Class Citizens:** In JavaScript, functions are treated like any other data type. This means:
    * You can assign them to variables.
    * You can pass them as arguments to other functions.
    * You can return them from functions.

* **Callback Functions:** A callback function is a function that's passed as an argument to another function. The idea is that the callback will be executed *later*, often when a specific task or event has completed.

* **Asynchronous Operations:** Many operations in JavaScript (like network requests, timers, or some file I/O) don't give you results immediately. Instead, they take time to complete. Callbacks allow you to execute code *after* these operations finish.

**Example**

```javascript
function fetchData(url, callback) {
  // Simulate a network request that takes time
  setTimeout(() => {
    const data = 'Some data fetched from the network';
    callback(data); // Execute the callback with the fetched data
  }, 1000); // Simulate a 1-second delay
}

function displayData(data) {
  console.log('Received data:', data);
}

fetchData('https://api.example.com', displayData); 
```

**Explanation**

1. **`fetchData`:** Simulates a network operation. It takes a URL and a callback function (`callback`) as arguments.
2. **`setTimeout`:**  Imitates the asynchronous nature of network requests. After the delay, it executes the callback function, passing it the fetched data.
3. **`displayData`:** A simple function to log data. 
4. **Calling `fetchData`:** You call `fetchData` and provide `displayData` as the callback.  

**Key Points**

* `fetchData` doesn't block the execution of the rest of your code.
* When the simulated network request completes, the `displayData` callback is invoked, and the received data is logged.

**Why Callbacks are Important in Node.js**

* **Non-blocking I/O:**  Node.js uses callbacks to avoid waiting for operations like file I/O or network requests to finish. This allows other code to run, keeping Node.js applications responsive.
* **Event Loop:** The event loop, at the heart of Node.js, frequently checks if any callbacks are ready to be executed. 




![image](https://github.com/Sagar-Chowdhury/LearningNode/assets/76145064/44b2dbb0-ef98-4208-8916-f6ad10617dbb)

**Diagram Dynamics**

* **Concurrent Requests:** Multiple clients send requests to the Node.js web server.
* **Event Queue:** Incoming requests are placed in the Event Queue.
* **Event Loop:** The core mechanism that picks up and processes requests one by one.
* **Thread Pool:** A limited set of threads to handle specific tasks.

**Request Handling**

1. **Event Loop Processing:** The Event Loop picks up a request from the Event Queue.
2. **Complexity Check:** The Event Loop assesses whether the request requires blocking I/O or intensive computation.

**Scenario 1: Simple Requests**

3. **Direct Handling:** If the request is simple, the Event Loop itself processes it entirely (reading, execution, response preparation).
4. **Response:** The Event Loop sends the prepared response to the client.

**Scenario 2: Complex Requests**

5. **Thread Delegation:** If the request is complex, the Event Loop offloads it to a thread from the internal thread pool.
6. **Thread Processing:**  The assigned thread handles the complex logic, including any blocking I/O or computation.
7. **Callback:** Upon completion, the thread sends the response back to the Event Loop. 
8. **Event Loop Delivery:** The Event Loop forwards the response to the client.

**Key Point:** Node.js prioritizes efficient processing of simple, non-blocking requests directly on the Event Loop. Complex tasks are strategically offloaded to the thread pool to prevent the Event Loop from stalling. 

Node.js leverages a built-in internal thread pool to offload certain potentially blocking or computationally intensive tasks. Let's break down what this means and how it works:

**Purpose of the Thread Pool**

* **Overcoming I/O Bottlenecks:**  JavaScript's single-threaded event loop is fantastic for handling many concurrent requests. However, operations like these can block the event loop:
    * File system I/O (reading/writing files)
    * Network operations 
    * Database queries
    * Certain crypto functions

* **Optimized Resource Use:**  Node.js uses a thread pool (managed by the libuv library) to execute these tasks on separate worker threads. This prevents the main event loop from stalling, enhancing responsiveness.

**Key Points**

* **Limited Size:** The thread pool typically has a default size of 4 threads. This can be adjusted using the `UV_THREADPOOL_SIZE` environment variable.
* **Task Delegation:** Node.js automatically determines which tasks are suitable for the thread pool.
* **Asynchronous Handling:**  Even when using the thread pool, Node.js maintains asynchronous behavior. When a task completes on a worker thread, a callback is queued in the event loop for processing the results.

**Common Operations Utilizing the Thread Pool**

* **`fs` module:** File system operations.
* **`crypto` module:** Some cryptographic functions.
* **`dns.lookup()`** Domain Name System (DNS) lookups.
* **`zlib` module:** Compression and decompression functions.

**Important Considerations**

* **Not All Operations:** Not every operation in Node.js uses the thread pool. Pure JavaScript execution and most networking tasks happen directly on the event loop.
* **CPU-Bound Tasks:** While the thread pool can help with I/O-bound tasks,  large CPU-intensive processes can still strain the system. Consider using Node.js's worker thread capabilities for such scenarios.

**Why the "Single-Threaded" Label Still Holds**

1. **JavaScript Execution:** Your core JavaScript code still executes within the single thread of the event loop. The thread pool doesn't create multiple threads to run your JS code concurrently.

2. **Focus on Asynchronous I/O:** Node.js is optimized for scenarios where many operations are asynchronous (mostly I/O bound). The thread pool acts as a crucial supporting mechanism, not a primary driver of execution.

**In Summary**

It's more accurate to describe Node.js as having a single-threaded architecture augmented by a thread pool to optimize specific operations. The single-threaded event loop remains the centerpiece of its execution model.







