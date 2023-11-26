// Import modules
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const pg = require('pg');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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

// Set views engine and directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Configure sessions and body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../CSS')));
app.use(express.static(path.join(__dirname, '../Images')));
app.use(express.static(path.join(__dirname, '../JS')));

// Define the route for the home page
app.get('/', (req, res) => {
    res.render('index', {req: req});
});

// Define the route for the booking page
app.get('/booking', (req, res) => {
    res.render('booking', {req: req});
});

// Define the route for the about page
app.get('/about', (req, res) => {
    res.render('about', {req: req});
});

// Define the route for the contact page
app.get('/contactus', (req, res) => {
    res.render('contactus', {req: req});
});

// Define the route for the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/accounts', (req, res) => {
    res.render('accounts', {req: req});
});

// User registration, add data to the database
app.post('/register', async (req, res) => {
    const {email, firstName, lastName, password} = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    var result = await hotelDB.query('insert into guest_account (email, first_name, last_name, password) values ($1, $2, $3, $4)', [email, firstName, lastName, hashPassword]);

    if (result.rowCount > 0) {
        // Log the user in after registration
        result = await hotelDB.query('select * from guest_account where email = $1', [email]);
        const user = result.rows[0];

        req.session.user = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        };

        res.redirect('/');

    } else {
        res.send('Error registering user');
    }
});

// User login
app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // Query database
    const result = await hotelDB.query('select * from guest_account where email = $1', [email]);

    if(result.rowCount > 0) {
        const user = result.rows[0];

        // Compare hashed password
        const match = await bcrypt.compare(password, user.password);

        // Check is passwords match
        if (match) {
            // Create a session
            req.session.user = {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            };

            // Redirect to homepage
            res.redirect('/');
        } else {
            // Password does not match
            res.redirect('/');
        }
    } else {
        // User does not exist
        res.redirect('/');
    }
});

// User logout
app.get('/logout', (req, res) => {
   req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }

        res.redirect('/');
   }); 
});

// Start the server
app.listen(port, host, (req, res) => {
    console.log('App running on http://' + host + ':' + port + '/');
});