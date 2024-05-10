![26850584_10156186800336579_1585065027752569016_o](https://github.com/Sagar-Chowdhury/LearningNode/assets/76145064/ea772230-e301-4852-93a0-73c864c88bd1)

### Important Points to remember

1. Concept of versioning in Npm [https://docs.npmjs.com/about-semantic-versioning ]
2. Server side rendering is faster than cliet side rendering , but former is useful only when client is Browser.
3. Concept of **Middleware** in node.js [https://expressjs.com/en/guide/using-middleware.html]
4. (`Docker Notes`) [https://github.com/Sagar-Chowdhury/Docker-Notes]
5. (`Rabbit Mq`) [https://github.com/Sagar-Chowdhury/RabbitMq-Notes]


### Node JS Architecture - Single Threaded Event Loop

*Node JS Single Threaded Event Loop Model*
As we have already discussed, Node JS applications uses “Single Threaded Event Loop Model” architecture to handle multiple concurrent clients. There are many web application technologies like *JSP, Spring MVC, ASP.NET, HTML, Ajax, jQuery* etc. But all these technologies follow **“Multi-Threaded Request-Response”** architecture to handle multiple concurrent clients. We are already familiar with “Multi-Threaded Request-Response” architecture because it’s used by most of the web application frameworks.

(`Traditional Web Application Processing Model` - `**Multi-Threaded Request-Response Model**`)

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

