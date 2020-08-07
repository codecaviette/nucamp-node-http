const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');           // Node has built-in node modules, including path and fs. To use, just need to import using "require" keyword
const fs = require('fs');

// Setup server. Create server object with createServer method using existing http.Server class 
const server = http.createServer((req, res) => {                // createServer method takes a callback fxn as a param, called a request handler, we're writing w arrow fxn. This request handler is called every time server receives a request, and it takes two objects as params, requests and response, that are streams. We don't create response obj ourselves. 
    console.log(`Request for ${req.url} by method ${req.method}`);
    
    if (req.method === 'GET' ) {                                        // If the request method IS GET, then... 
        let fileUrl = req.url;
        if(fileUrl === '/' ) {                                          // If file url is localhost:3000/ then set url to /index.html and display index.html page
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl);            // Get full, absolute path of file that has been requested. Use path.resolve to convert relative path to absolute path. The relative path to the file is /public then we add fileUrl to it; fileUrl will already have a / as its first character which is why we don't need to specify/include it here.
        const fileExt = path.extname(filePath);                         // We only want the server to grant request for html files, so we use path.extname method to parse out extension frome filePath
        
        if(fileExt === '.html') {                                       // If requested file's extension IS .html, then we check if the file even exists on server using fs.access method
            fs.access(filePath, err => {                                // Use fs.access method to check if file exists/is accessible on server; 1st argument: the path of the file we want to check; 2nd argument: callback that takes an error argument which we'll call "err" 
                if (err) {                                              // If the file does not exist on server, an error "err" object will be returned
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1> Error 404: ${fileUrl} not found </h1><body></html> `);
                    return;                                             // Use return statement so that the code after this not executed
                }
                res.statusCode = 200;                                   // Finally, if requested file is accessible/exists on server, then response object will have the successful status code 200
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res);                // To send the file, use the fs.createReadStream method and give it the filePath, which reads contents of the file its given in small chunks, similar to lazy loading in RN. Then, we're taking the contents and sending it to the response object via the pipe method, which can be used between two Node streams to transfer data
            });                                                         // createReadStream ends the response so there's no need to include res.end here
        } else {                                                        // If file extension IS NOT .html, then the response object will have the following properties...
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1> Error 404: ${fileUrl} is not an HTML file </h1><body></html> `);
        }
    } else {                                                            // If the request method is NOT GET, then the response object will have the following properties...
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1> Error 404: ${req.method} not supported </h1><body></html> `);
    };
});

// Now that we've created the server, we need to start it. We're using the server variable created above as well as port and hostname. 3rd argument is a callback fxn that will be run when server starts up, just to let us know it's working and running
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});