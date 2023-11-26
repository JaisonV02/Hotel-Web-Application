// Import modules
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const pg = require('pg');

// Server port and host
const port = 8080;
const host = 'localhost';

// Configure env
dotenv.config();

// Configure database connection
const hotelDB = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Connect to database
hotelDB.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
    } else {
        console.log('Successfully connected to the database');
        client.release();
    }
});

// Create an Express app
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../CSS')));
app.use(express.static(path.join(__dirname, '../Images')));
app.use(express.static(path.join(__dirname, '../JS')));

// Define the route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Define the route for the booking page
app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, '../booking.html'));
});

// Define the route for the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../about.html'));
});

// Define the route for the contact page
app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, '../contactus.html'));
});

// Define the route for the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
});

// Start the server
app.listen(port, host, (req, res) => {
    console.log('App running on http://' + host + ':' + port + '/');
});