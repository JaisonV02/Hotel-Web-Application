// Import modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Server port and host
const port = 8080;
const host = 'localhost';

// Create the server
const server = http.createServer(function(req, res) {
    fs.readFile(path.join(__dirname, '../index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('404 Not Found');
        } else {
            res.statusCode = 200;
            res.end(data);
        }
    });
});

// Start the server
server.listen(port, host, () => {console.log('Server running on http://' + host + ':' + port + '/');});