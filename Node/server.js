/* Authors: Christopher Walsh & Jaison Vargis
     Date started: 18/11/23
     Date submitted: 10/12/23
     This is the server backend for the RoyalHotels website
     This contains the imports,server setup and REST functions of the website
*/

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
    // Get room info based on criteria submitted by booking form
    try {
        const rooms = await hotelDB.query('select distinct on(rt_id)* from room join room_type using(rt_id) where hotel_id = $1 AND booked = false',[req.session.bookingForm.location]);
        const rooms2 = rooms.rows;
        res.render('booking', {req: req, rooms2: rooms2});
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.get('/bookingaddons', async (req, res)=> {
    try {
        const rooms = await hotelDB.query('select * from room join room_type using(rt_id) where room_id = $1',[req.session.bookingForm.room_id]);
        const rooms2 = rooms.rows;
        res.render('bookingaddons', {req: req, rooms2: rooms2});
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

// Define the route for the about page
app.get('/about', (req, res) => {
    res.render('about', {req: req});
});

// Define the route for the contact page
app.get('/contactus', (req, res) => {
    res.render('contactus', {req: req});
});

// Define the route for the admin page
app.get('/admin', async (req, res) => {
    if (req.session.user && req.session.user.email == 'admin@royalhotels.com') {
        try {
            const query = await hotelDB.query('select * from room join room_type using (rt_id) join hotel using (hotel_id)');
            const rooms = query.rows;
            const query2 = await hotelDB.query('select * from hotel');
            const locations = query2.rows;
            const query3 = await hotelDB.query('select * from room_type');
            const room_type = query3.rows;
            res.render('admin', {req: req, rooms: rooms, locations: locations, room_type: room_type});
        } catch (err) {
            res.status(500).send('Server Error');
        }
    } else {
        // Redirect to the home page
        res.redirect('/');
    }
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
    // If the user is not logged in, redirect them to the home page
    if (!req.session.user) {
        res.redirect('/');
    } else {
        // Otherwise render the accounts page
        res.render('accounts', {req: req});
    }
});

// Define the route for the my bookings page
app.get('/mybookings', async (req, res) => {
    // Get room info based on rooms booked by the user
    try {
        const rooms = await hotelDB.query('select * from room join room_type using(rt_id) where booked_by_email = $1 AND booked = true',[req.session.user.email]);
        const rooms2 = rooms.rows;
        res.render('mybookings', {req: req, rooms2: rooms2});
    } catch (err) {
        req.flash('error', 'No bookings found');
        res.redirect('/');
    }
});

// Define the route for the my bookings page
// Currently not working
// Intent was to allow the user to edit the names of their guests
app.get('/mybookingsedit' , async (req,res) => {
        const {room_id} = req.body;
        const rooms = await hotelDB.query('select * from room join room_type using(rt_id) where booked_by_email = $1 AND booked = true',[req.session.user.email]);
        const rooms2 = rooms.rows;
        const guests = await hotelDB.query('select * from guests where room_id = $1',[room_id]);
        const guestsrows = guests.rows;
        console.log(guestsrows);
        res.render('mybookingsedit', {req:req ,guestsrows: guestsrows,rooms2:rooms2 });
    
})

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
    try {
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
    } catch (err) {
        req.flash('error', 'Could not delete account, try again later');
        res.redirect('/accounts');
    }
});

// Booking Functions
// Post booking form
app.post('/bookingForm', async(req,res) => {
    const {location,checkin_date,checkout_date,adults,children} = req.body;
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

app.post('/bookRoom', async(req,res) => {
    const {room_id} = req.body; 
    // Add room_id to bookingForm session
    req.session.bookingForm = {
        location: req.session.bookingForm.location,
        checkin_date: req.session.bookingForm.checkin_date,
        checkout_date: req.session.bookingForm.checkout_date,
        adults: req.session.bookingForm.adults,
        children: req.session.bookingForm.children,
        room_id: room_id
    }
    res.redirect('/bookingaddons');
    console.log(req.session.bookingForm);
});

app.post('/book', async(req,res) => {
    const {guest1,guest2,guest3,guest4,guest5,guest6,guest7,guest8} = req.body;

    try{
        // Try to update the room table first then add guests
        const result = await hotelDB.query('insert into guests (room_id,guest1,guest2,guest3,guest4,guest5,guest6,guest7,guest8) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',[req.session.bookingForm.room_id,guest1,guest2,guest3,guest4,guest5,guest6,guest7,guest8]);
        if(result.rowCount > 0) {
            await hotelDB.query('update room set check_in_date = $1,check_out_date = $2,booked = true,booked_by_email = $3 where room_id = $4',[req.session.bookingForm.checkin_date,req.session.bookingForm.checkout_date,req.session.user.email,req.session.bookingForm.room_id]);
            req.flash('success', 'Room successfully booked');
            res.redirect('/');
        }
        else {
            req.flash('error', 'Room Could not be booked');
            res.redirect('/booking');
        }
        // If room cant be booked send user back to booking selection
        // Should prevent errors in theory but room choice is already filtered by what is currently available
        // Which makes this impossble to occur to my knowledge
        // Leaving catch clause just incase a situation does arise
    }catch {
        req.flash('error', 'Room Could not be booked');
        res.redirect('/booking');
    }
});

// Function currently not working
// Intent was to allow for editing of guests in DB
app.post('/mybookingsedit', async(req,res)=> {

    const {room_id} = req.body;
    const guests = await hotelDB.query('select * from guests where room_id = $1',[room_id]);
    const guestsrows = guests.rows;
    res.redirect('/mybookingsedit');
    
})

app.post('/mybookingsdelete', async(req,res)=> {
    const {room_id} = req.body;
    try{
        const result = await hotelDB.query('update room set check_in_date = null ,check_out_date = null ,booked = false ,booked_by_email = null where room_id = $1',[room_id]);
        await hotelDB.query('delete from guests where room_id = $1',[room_id]);
        req.flash('success', 'Removed booking');
        res.redirect('/');
    } catch (err) {
        req.flash('error', 'Could not remove booking');
        res.redirect('/');
    }
    
})

// Admin functions
// Add rooms
app.post('/admin/add/room', async(req,res) => {
    try {
        const {location, room_type, room_no} = req.body;
        const result = await hotelDB.query('insert into room (rt_id, hotel_id, room_no, booked) values ($1, $2, $3, FALSE)', [room_type, location, room_no]);
    
        if (result.rowCount > 0) {
            req.flash('success', 'Room successfully added');
            res.redirect('/admin');
        } else {
            req.flash('error', 'Could not add room');
            res.redirect('/admin');
        }
    } catch (err) {
        req.flash('error', 'Could not add room');
        res.redirect('/admin');
    }
});

// Delete rooms
app.post('/admin/delete/room', async(req, res) => {
    try {
        const {room_id} = req.body;
        const result = await hotelDB.query('delete from room where room_id = $1', [room_id]);
    
        if (result.rowCount > 0) {
            req.flash('warning', 'Room successfully deleted');
            res.redirect('/admin');
        } else {
            req.flash('error', 'Could not delete room');
            res.redirect('/admin');
        }
    } catch (err) {
        req.flash('error', 'Could not delete room');
        res.redirect('/admin');
    }
});

// Start the server
app.listen(port, host, (req, res) => {
    console.log('App running on http://' + host + ':' + port + '/');
});