select * from guest_account ga;
select * from room_type rt;
select * from room r ;
select * from hotel h ;

-- Drop Tables
drop table room;
drop table room_type;
drop table hotel;
drop table guest_account;
drop table guests;

-- Create Tables
-- Create guest_account table
create table guest_account (
    email varchar(100) primary key,
    first_name varchar(50),
    last_name varchar(50),
    password varchar(64)
);

-- Create guests table
-- For use in assigning guests per room
create table guests (
	booking_id serial primary key,
    room_id Integer,
    guest1 varchar(50),
   	guest2 varchar(50),
    guest3 varchar(50),
    guest4 varchar(50),
    guest5 varchar(50),
    guest6 varchar(50),
    guest7 varchar(50),
    guest8 varchar(50)
);


-- Create table hotels
create table hotel (
    hotel_id serial primary key,
    city varchar(50),
    country varchar(50)
);

-- Create table room_type
create table room_type (
	rt_id serial primary key,
	rt_name varchar(40),
	rt_desc varchar(500),
	guest_capacity integer,
	price Integer
);

-- Create table room
create table room (
	room_id serial primary key,
	rt_id integer references room_type,
	hotel_id integer references hotel,
	room_no integer,
	check_in_date Date,
	check_out_date Date,
	booked boolean,
	booked_by_email varchar(100)
);

-- Values
-- Insert admin account
insert into guest_account (email, first_name, password)
values ('admin@royalhotels.com', 'Admin', 'admin');

-- Insert Hotels
insert into hotel (city, country)
values
	('Dublin', 'Ireland'),
	('London', 'United Kingdom'),
	('Amsterdam', 'Netherlands'),
	('Madrid', 'Spain'),
	('Paris', 'France'),
	('Vienna', 'Austria');

-- Insert RoomTypes
insert into room_type (rt_name, rt_desc, guest_capacity,price)
values
	('Single','1 bed fit for 1 person fitted with amenitites',1,49),
	('Double','1 double bed for 2 people fitted with amenitites',2,59),
	('Twin','2 single beds fit for 2 people with amenities',2,59),
	('Family','2 king sized beds along with 2 single beds fit for a family of 6',6,79);


-- Insert Rooms
-- For Hotel 1
INSERT INTO room (rt_id, hotel_id, room_no, booked)
VALUES 
	(1, 1, 1, FALSE),
	(1, 1, 2, FALSE),
	(1, 1, 3, FALSE),
	(1, 1, 4, FALSE),
	(2, 1, 5, FALSE),
	(2, 1, 6, FALSE),
	(2, 1, 7, FALSE),
	(2, 1, 8, FALSE),
	(3, 1, 9, FALSE),
	(3, 1, 10, FALSE),
	(3, 1, 11, FALSE),
	(3, 1, 12, FALSE),
	(4, 1, 13, FALSE),
	(4, 1, 14, FALSE),
	(4, 1, 15, FALSE),
	(4, 1, 16, FALSE);

-- For Hotel 2
INSERT INTO room (rt_id, hotel_id, room_no, booked)
VALUES 
	(1, 2, 1, FALSE),
	(1, 2, 2, FALSE),
	(1, 2, 3, FALSE),
	(1, 2, 4, FALSE),
	(2, 2, 5, FALSE),
	(2, 2, 6, FALSE),
	(2, 2, 7, FALSE),
	(2, 2, 8, FALSE),
	(3, 2, 9, FALSE),
	(3, 2, 10, FALSE),
	(3, 2, 11, FALSE),
	(3, 2, 12, FALSE),
	(4, 2, 13, FALSE),
	(4, 2, 14, FALSE),
	(4, 2, 15, FALSE),
	(4, 2, 16, FALSE);
	
-- For Hotel 3
INSERT INTO room (rt_id, hotel_id, room_no, booked)
VALUES 
	(1, 3, 1, FALSE),
	(1, 3, 2, FALSE),
	(1, 3, 3, FALSE),
	(1, 3, 4, FALSE),
	(2, 3, 5, FALSE),
	(2, 3, 6, FALSE),
	(2, 3, 7, FALSE),
	(2, 3, 8, FALSE),
	(3, 3, 9, FALSE),
	(3, 3, 10, FALSE),
	(3, 3, 11, FALSE),
	(3, 3, 12, FALSE),
	(4, 3, 13, FALSE),
	(4, 3, 14, FALSE),
	(4, 3, 15, FALSE),
	(4, 3, 16, FALSE);

-- For Hotel 4
INSERT INTO room (rt_id, hotel_id, room_no, booked)
VALUES 
	(1, 4, 1, FALSE),
	(1, 4, 2, FALSE),
	(1, 4, 3, FALSE),
	(1, 4, 4, FALSE),
	(2, 4, 5, FALSE),
	(2, 4, 6, FALSE),
	(2, 4, 7, FALSE),
	(2, 4, 8, FALSE),
	(3, 4, 9, FALSE),
	(3, 4, 10, FALSE),
	(3, 4, 11, FALSE),
	(3, 4, 12, FALSE),
	(4, 4, 13, FALSE),
	(4, 4, 14, FALSE),
	(4, 4, 15, FALSE),
	(4, 4, 16, FALSE);

-- For Hotel 5
INSERT INTO room (rt_id, hotel_id, room_no, booked)
VALUES 
	(1, 5, 1, FALSE),
	(1, 5, 2, FALSE),
	(1, 5, 3, FALSE),
	(1, 5, 4, FALSE),
	(2, 5, 5, FALSE),
	(2, 5, 6, FALSE),
	(2, 5, 7, FALSE),
	(2, 5, 8, FALSE),
	(3, 5, 9, FALSE),
	(3, 5, 10, FALSE),
	(3, 5, 11, FALSE),
	(3, 5, 12, FALSE),
	(4, 5, 13, FALSE),
	(4, 5, 14, FALSE),
	(4, 5, 15, FALSE),
	(4, 5, 16, FALSE);

-- For Hotel 6
INSERT INTO room (rt_id, hotel_id, room_no, booked)
VALUES 
	(1, 6, 1, FALSE),
	(1, 6, 2, FALSE),
	(1, 6, 3, FALSE),
	(1, 6, 4, FALSE),
	(2, 6, 5, FALSE),
	(2, 6, 6, FALSE),
	(2, 6, 7, FALSE),
	(2, 6, 8, FALSE),
	(3, 6, 9, FALSE),
	(3, 6, 10, FALSE),
	(3, 6, 11, FALSE),
	(3, 6, 12, FALSE),
	(4, 6, 13, FALSE),
	(4, 6, 14, FALSE),
	(4, 6, 15, FALSE),
	(4, 6, 16, FALSE);
