// Import modules
const express = require('express');
const path = require('path');

// Server port and host
const port = 8080;
const host = 'localhost';

// Create an Express app
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Define the route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start the server
app.listen(port, host, (req, res) => {console.log('App running on http://' + host + ':' + port + '/');});