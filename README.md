# Hotel-Web-Application

A web application for a hotel made by Jaison Vargis and Christopher Walsh.

This Hotel Web Application for a hotels we named Royal Hotels implements Bootstrap 5 and Node as core components.

![Home Page](/Images/Screenshots/Homepage.png)

## Configuration and Deployment
To deploy this project using Node, first we must setup the database. Using the SQL file [Hotel.sql](/Node/sql/Hotel.sql) or [Hotel_DB_Dump.sql](/Node/sql/Hotel_DB_Dump.sql) which is a dump of our database to create a database for this website, we should be able to start deploying the database. This web application uses Postgres databases.

Once we have setup the database, next we must create a .env file and place it inside the /Node folder.

Inside the .env file we should include the following data:

- DB_HOST=XXX
- DB_USER=XXX
- DB_PASSWORD=XXX
- DB_PORT=5432
- DB_DATABASE=postgres
- SESSION_SECRET=XXX

The ones that begin with DB is info for the database. Session secret is for the user session using express-session.

Once the setup is complete, we should be able to start the server. To start the server, cd into the /Node directory and run the following command: `Node server.js`. This will run the code inside the server.js file and the server will start running on port 8080.

## Project Structure

### CSS
The CSS used for this project is Bootstrap 5 and some custom CSS code. We customised the Bootstrap theme for our application by using SCSS files and VS Code extensions. to be able to generate a new Bootstrap file with our custom theme. [custom.css](/CSS/custom.css) contains our bootstrap CSS with our custom theme.

### Images
The images we use which have credited for this project are mainly bedrooms which are taken from different hotels accross the world. Generic images such as an image of a balcony and our logo. The logo was generated on https://logo.com/. There are also some screenshots of the websites and its different pages.

### Node
Node is an important component for this project. There are many libraries that we installed for this application to work and one library to help us as a developer.

**Dependencies:**
- bcrypt
- body-parser
- bootstrap
- connect-flash
- dotenv
- ejs
- express
- express-session
- pg

**Developer Dependencies**
- nodemon

***Uses for each dependency***
- **bcrypt** - Hashes user's password before storing them in database.
- **body-parser** - Helps with user sessions.
- **bootstrap** - Contains bootstrap CSS and JS files.
- **connect-flash** - Allows us to send messages to the frontend and display it to the user. Helps with error handling.
- **dotenv** - Allows us to access sensitive information from .env files which contains info which allows us to connect to the database and stores the session secret key.
- **ejs** - Embedded javascript template files which we use instead of html files. Allows us to write dynamic html pages which can change based on the user, session and data available from the database.
- **express** - Middleware and routing for our web application. Allows us to perform various tasks and functions for our application.
- **express-session** - Allows us to manage user sessions and persist data. Session data is stored on server side.
- **pg** - Library which allows us to connect to a Postgres database and perform CRUD operations.
- **nodemon** - Restarts the server whenever a change is detected in our server.js file.

This is all included in [package.json](/Node/package.json).

The [server.js](/Node/server.js) includes the javascript code which contains our Node server code. This file is the backend for our web application and handles our expressjs routes. The connection to our Postgres database is also handled in this file. The server.js file contains the code which utilises all our dependencies allowing the web application to work.

### Views
The views folder contains all our web pages which are all .ejs files. Most of these pages are accessed through their respective routes. However some pages can only be accessed while you are logged in.

[index.ejs](/views/index.ejs) is the home page this application. The user can book a hotel room here and it will take them to a booking page. The user can also access the Home, About, and Contact Us page from the navbar which is available on all pages.
![Home Page](/Images/Screenshots/Homepage.png)

[about.ejs](/views/about.ejs) is the about us page.
![About Us](/Images/Screenshots/Aboutus.png)

[accounts.ejs](/views/accounts.ejs) is a page only someone who is signed in can access. This allows the user to edit their account and or delete it.
![Accounts](/Images/Screenshots/Accounts.png)

[admin.ejs](/views/admin.ejs) is a page only someone who is signed in as an admin can access. This page allows you to add and delete rooms accross the hotels.
![Admin](/Images/Screenshots/Admin.png)

[booking.ejs](/views/booking.ejs) is a page where the user can select which room they want to book.
![Booking](/Images/Screenshots/Booking.png)

[bookingaddons.ejs](/views/bookingaddons.ejs) is a page where the user can enter the names of the guest they want to book for.
![Booking Addons](/Images/Screenshots/Bookingaddon.png)

[contactus.ejs](/views/contactus.ejs) is the contact us page.
![Contact Us](/Images/Screenshots/Contactus.png)

[login.ejs](/views/login.ejs) is the user login and registration page.
![Login](/Images/Screenshots/Login.png)

[mybookings.ejs](/views/mybookings.ejs) is the page where the user can view all their bookings and edit them.
![My Bookings](/Images/Screenshots/Mybookings.png)

[mybookingsedit.ejs](/views/mybookingsedit.ejs) is a page where the user can edit their bookings.
![My Bookings Edit](/Images/Screenshots/Mybookingsedit.png)

### Gitignore
Gitignore tells git to ignore the node modules because it is unecessary to push. The .env file is ignored because it contains sensitive information.