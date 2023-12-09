// Import modules
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const pg = require('pg');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

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

// Use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '../CSS')));
app.use(express.static(path.join(__dirname, '../Images')));
app.use(express.static(path.join(__dirname, '../JS')));

// Define the route for the home page
app.get('/', async (req, res) => {
    // Retrieve all the locations available for home page bookings
    try {
        const query = await hotelDB.query('select * from hotel');
        const locations = query.rows;
        res.render('index', {req: req, locations: locations});
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Define the route for the booking page
app.get('/booking', async (req, res) => {
    if(req.session.user) {
        // Get room info based on criteria submitted by booking form
        try {
            const rooms = await hotelDB.query('select distinct on(rt_id)* from room join room_type using(rt_id) where hotel_id = $1 AND booked = false',[req.session.bookingForm.location]);
            const rooms2 = rooms.rows;
            res.render('booking', {req: req, rooms2: rooms2});
        } catch (err) {
            res.status(500).send('Server Error');
        }
    } else {
        req.flash('error', 'Please login before you book');
        res.redirect('/');
    }
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
    // If the user is logged in, redirect them to the home page
    if (req.session.user) {
        res.redirect('/');
    } else {
        // Otherwise render the login page
        res.render('login', {req: req});
    }
});

// Define route for the accounts page
app.get('/accounts', (req, res) => {
    res.render('accounts', {req: req});
});

// Define the route for the my bookings page
app.get('/mybookings', (req, res) => {
    res.render('mybookings', {req: req});
});

// User registration, add data to the database
app.post('/register', async (req, res) => {
    const {email, firstName, lastName, password} = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    try{
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
            req.flash('error', 'Error registering user');
            res.redirect('/login');
        }
    } catch (err) {
        req.flash('error', 'This email is already in use');
        res.redirect('/login');
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
            req.flash('error', 'Invalid password');
            res.redirect('/login');
        }
    } else {
        // User does not exist
        req.flash('error', 'User does not exist');
        res.redirect('/login');
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

// Update Account details
app.post('/update', async (req, res) => {
    const {email, firstName, lastName, password} = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    let passwordLength = password.length

    // Checking the length of the user's password
    // If user inputs any new data into the password form the else statement should activate
    if (passwordLength == 0 ) {
        // Update the account with everything but password
        var result = await hotelDB.query('update guest_account set email = $1, first_name = $2, last_name = $3 where email = $4', [email, firstName, lastName, req.session.user.email]);
        result = await hotelDB.query('select * from guest_account where email = $1', [email]);

    } else {
        // Update the account with full details
        var result = await hotelDB.query('update guest_account set email = $1, first_name = $2, last_name = $3, password = $4 where email = $5', [email, firstName, lastName, hashPassword, req.session.user.email]);
        result = await hotelDB.query('select * from guest_account where email = $1', [email]);

    }


    if (result.rowCount > 0) {
        const user = result.rows[0];

        // Update session
        req.session.user = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        };

        // Redirect to homepage
        req.flash('success', 'Account updated successfully');
        res.redirect('/accounts');
    } else {
        req.flash('error', 'Account could not be updated');
        res.redirect('/accounts');
    }
});

// Delete Account
app.post('/delete', async (req, res) => {
    // Delete account from database
    const result = await hotelDB.query('delete from guest_account where email = $1', [req.session.user.email]);

    if (result.rowCount > 0) {
        // Destroy the session
        req.session.destroy((err) => {
           if (err) {
                return console.log(err);
           }

           res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

// Booking Functions
// Post booking form
app.post('/bookingForm', async(req,res) => {
    const {location,checkin_date,checkout_date,adults,children} = req.body
    // Create a session
    req.session.bookingForm = {
        location: location,
        checkin_date: checkin_date,
        checkout_date: checkout_date,
        adults: adults,
        children: children
    };
    res.redirect('/booking');


    console.log(location,checkin_date,checkout_date,adults,children);

});


// Start the server
app.listen(port, host, (req, res) => {
    console.log('App running on http://' + host + ':' + port + '/');
});