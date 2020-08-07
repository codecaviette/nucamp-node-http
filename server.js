const http = require('http');

const hostname = 'localhost';
const port = 3000;

// Setup server. Create server object with createServer method using existing http.Server class 
const server = http.createServer((req, res) => {                // createServer method takes a callback fxn as a param, called a request handler, we're writing w arrow fxn. This request handler is called every time server receives a request, and it takes two objects as params, requests and response, that are streams. We don't create response obj ourselves. 
    console.log(req.headers);                                   // req object gives us access to headers using req.headers
    res.statusCode = 200;                                       // Add status code property to response object. Status code of 200, which means everything is okay
    res.setHeader('Content-Type', 'text/html');                 // Set up header for response object. 1st argument, Content-Type, is passed as a string and tells client what type of data to expext in response body. 2nd argument: also passing value for header as a string
    res.end('<html><body><h1> Hello, world! </h1></body><html>');                        // Setup response body and close/complete response stream using res.end method. When response body is short, we can just include it as part of res.end() method by passing it the string to include as body. Now that response is complete, it's ready to be sent back to client.
});

// Now that we've created the server, we need to start it. We're using the server variable created above as well as port and hostname. 3rd argument is a callback fxn that will be run when server starts up, just to let us know it's working and running
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}) 


 