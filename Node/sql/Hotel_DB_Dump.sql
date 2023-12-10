--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Hotel; Type: SCHEMA; Schema: -; Owner: Hotel
--

CREATE SCHEMA "Hotel";


ALTER SCHEMA "Hotel" OWNER TO "Hotel";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: guest_account; Type: TABLE; Schema: Hotel; Owner: Hotel
--

CREATE TABLE "Hotel".guest_account (
    email character varying(100) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    password character varying(64)
);


ALTER TABLE "Hotel".guest_account OWNER TO "Hotel";

--
-- Name: guests; Type: TABLE; Schema: Hotel; Owner: Hotel
--

CREATE TABLE "Hotel".guests (
    booking_id integer NOT NULL,
    room_id integer,
    guest1 character varying(50),
    guest2 character varying(50),
    guest3 character varying(50),
    guest4 character varying(50),
    guest5 character varying(50),
    guest6 character varying(50),
    guest7 character varying(50),
    guest8 character varying(50)
);


ALTER TABLE "Hotel".guests OWNER TO "Hotel";

--
-- Name: guests_booking_id_seq; Type: SEQUENCE; Schema: Hotel; Owner: Hotel
--

CREATE SEQUENCE "Hotel".guests_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Hotel".guests_booking_id_seq OWNER TO "Hotel";

--
-- Name: guests_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: Hotel; Owner: Hotel
--

ALTER SEQUENCE "Hotel".guests_booking_id_seq OWNED BY "Hotel".guests.booking_id;


--
-- Name: hotel; Type: TABLE; Schema: Hotel; Owner: Hotel
--

CREATE TABLE "Hotel".hotel (
    hotel_id integer NOT NULL,
    city character varying(50),
    country character varying(50)
);


ALTER TABLE "Hotel".hotel OWNER TO "Hotel";

--
-- Name: hotel_hotel_id_seq; Type: SEQUENCE; Schema: Hotel; Owner: Hotel
--

CREATE SEQUENCE "Hotel".hotel_hotel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Hotel".hotel_hotel_id_seq OWNER TO "Hotel";

--
-- Name: hotel_hotel_id_seq; Type: SEQUENCE OWNED BY; Schema: Hotel; Owner: Hotel
--

ALTER SEQUENCE "Hotel".hotel_hotel_id_seq OWNED BY "Hotel".hotel.hotel_id;


--
-- Name: room; Type: TABLE; Schema: Hotel; Owner: Hotel
--

CREATE TABLE "Hotel".room (
    room_id integer NOT NULL,
    rt_id integer,
    hotel_id integer,
    room_no integer,
    check_in_date date,
    check_out_date date,
    booked boolean,
    booked_by_email character varying(100)
);


ALTER TABLE "Hotel".room OWNER TO "Hotel";

--
-- Name: room_room_id_seq; Type: SEQUENCE; Schema: Hotel; Owner: Hotel
--

CREATE SEQUENCE "Hotel".room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Hotel".room_room_id_seq OWNER TO "Hotel";

--
-- Name: room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: Hotel; Owner: Hotel
--

ALTER SEQUENCE "Hotel".room_room_id_seq OWNED BY "Hotel".room.room_id;


--
-- Name: room_type; Type: TABLE; Schema: Hotel; Owner: Hotel
--

CREATE TABLE "Hotel".room_type (
    rt_id integer NOT NULL,
    rt_name character varying(40),
    rt_desc character varying(500),
    guest_capacity integer,
    price integer
);


ALTER TABLE "Hotel".room_type OWNER TO "Hotel";

--
-- Name: room_type_rt_id_seq; Type: SEQUENCE; Schema: Hotel; Owner: Hotel
--

CREATE SEQUENCE "Hotel".room_type_rt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Hotel".room_type_rt_id_seq OWNER TO "Hotel";

--
-- Name: room_type_rt_id_seq; Type: SEQUENCE OWNED BY; Schema: Hotel; Owner: Hotel
--

ALTER SEQUENCE "Hotel".room_type_rt_id_seq OWNED BY "Hotel".room_type.rt_id;


--
-- Name: guests booking_id; Type: DEFAULT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".guests ALTER COLUMN booking_id SET DEFAULT nextval('"Hotel".guests_booking_id_seq'::regclass);


--
-- Name: hotel hotel_id; Type: DEFAULT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".hotel ALTER COLUMN hotel_id SET DEFAULT nextval('"Hotel".hotel_hotel_id_seq'::regclass);


--
-- Name: room room_id; Type: DEFAULT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".room ALTER COLUMN room_id SET DEFAULT nextval('"Hotel".room_room_id_seq'::regclass);


--
-- Name: room_type rt_id; Type: DEFAULT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".room_type ALTER COLUMN rt_id SET DEFAULT nextval('"Hotel".room_type_rt_id_seq'::regclass);


--
-- Data for Name: guest_account; Type: TABLE DATA; Schema: Hotel; Owner: Hotel
--

COPY "Hotel".guest_account (email, first_name, last_name, password) FROM stdin;
jaison@example.com	Jaison	Vargis	$2b$10$4HEVC0fRYoPbSplXu0E0teYaQHZBs4.S.evN40BTfE6.EEwsfE1IC
chris@example.com	Chris	Walsh	$2b$10$JxmiGlVn1j/qyHTq3vsR/uu6lZw4wg3el5WE2ah4YSwXIFyRA5zf2
filip@example.com	Filip	Kruk	$2b$10$bCnbbYWY5OCYbZPyiNwgUuXey.O/41YRd0ggfM0o2uKFQEI6VuSca
admin@royalhotels.com	Admin		$2b$10$gJ4TsUN1utB07dxoJHggsexulcWoDqq1u1tJ1wrXCJuZgLqHbhxi2
TimHolland@gmail.com	Tim	Holland	$2b$10$ElGtQVfmTfSfOz.trIRdBOjQO7t9thBS6P7wIa0.S2zS9fRBy4exu
john@example.com	John	Doe	$2b$10$PWlqZ7NgwLxOnOObLuJPT.W2aA/Gx6.WeK/cn1CDU5v7g0cLIvfPO
Micheal@gmail.com	Micheal	Micheal	$2b$10$n6eKEVdhIXhfEb3jqZjJi.wdd3KALlvqujow5hC74wOy99dG04h56
TomFinland@gmail.com	Tom	Finland	$2b$10$lIZCZeqfJ8i9GYwpkvuhAudqZNgGLhwRL6T0xZb0IOvgRUZrfRXoS
\.


--
-- Data for Name: guests; Type: TABLE DATA; Schema: Hotel; Owner: Hotel
--

COPY "Hotel".guests (booking_id, room_id, guest1, guest2, guest3, guest4, guest5, guest6, guest7, guest8) FROM stdin;
1	57	Micheal	\N	\N	\N	\N	\N	\N	\N
2	58	Tom	Charles	\N	\N	\N	\N	\N	\N
4	9	Tom	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: hotel; Type: TABLE DATA; Schema: Hotel; Owner: Hotel
--

COPY "Hotel".hotel (hotel_id, city, country) FROM stdin;
1	Dublin	Ireland
2	London	United Kingdom
3	Amsterdam	Netherlands
4	Madrid	Spain
5	Paris	France
6	Vienna	Austria
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: Hotel; Owner: Hotel
--

COPY "Hotel".room (room_id, rt_id, hotel_id, room_no, check_in_date, check_out_date, booked, booked_by_email) FROM stdin;
1	1	1	1	\N	\N	f	\N
3	1	1	3	\N	\N	f	\N
4	1	1	4	\N	\N	f	\N
7	2	1	7	\N	\N	f	\N
8	2	1	8	\N	\N	f	\N
10	3	1	10	\N	\N	f	\N
11	3	1	11	\N	\N	f	\N
12	3	1	12	\N	\N	f	\N
13	4	1	13	\N	\N	f	\N
14	4	1	14	\N	\N	f	\N
15	4	1	15	\N	\N	f	\N
16	4	1	16	\N	\N	f	\N
17	1	2	1	\N	\N	f	\N
18	1	2	2	\N	\N	f	\N
19	1	2	3	\N	\N	f	\N
20	1	2	4	\N	\N	f	\N
21	2	2	5	\N	\N	f	\N
22	2	2	6	\N	\N	f	\N
23	2	2	7	\N	\N	f	\N
24	2	2	8	\N	\N	f	\N
25	3	2	9	\N	\N	f	\N
26	3	2	10	\N	\N	f	\N
27	3	2	11	\N	\N	f	\N
28	3	2	12	\N	\N	f	\N
29	4	2	13	\N	\N	f	\N
30	4	2	14	\N	\N	f	\N
31	4	2	15	\N	\N	f	\N
32	4	2	16	\N	\N	f	\N
33	1	3	1	\N	\N	f	\N
34	1	3	2	\N	\N	f	\N
35	1	3	3	\N	\N	f	\N
36	1	3	4	\N	\N	f	\N
37	2	3	5	\N	\N	f	\N
38	2	3	6	\N	\N	f	\N
39	2	3	7	\N	\N	f	\N
40	2	3	8	\N	\N	f	\N
41	3	3	9	\N	\N	f	\N
42	3	3	10	\N	\N	f	\N
43	3	3	11	\N	\N	f	\N
44	3	3	12	\N	\N	f	\N
45	4	3	13	\N	\N	f	\N
46	4	3	14	\N	\N	f	\N
47	4	3	15	\N	\N	f	\N
48	4	3	16	\N	\N	f	\N
49	1	4	1	\N	\N	f	\N
50	1	4	2	\N	\N	f	\N
51	1	4	3	\N	\N	f	\N
52	1	4	4	\N	\N	f	\N
53	2	4	5	\N	\N	f	\N
54	2	4	6	\N	\N	f	\N
55	2	4	7	\N	\N	f	\N
56	2	4	8	\N	\N	f	\N
59	3	4	11	\N	\N	f	\N
60	3	4	12	\N	\N	f	\N
61	4	4	13	\N	\N	f	\N
62	4	4	14	\N	\N	f	\N
63	4	4	15	\N	\N	f	\N
64	4	4	16	\N	\N	f	\N
65	1	5	1	\N	\N	f	\N
66	1	5	2	\N	\N	f	\N
67	1	5	3	\N	\N	f	\N
68	1	5	4	\N	\N	f	\N
70	2	5	6	\N	\N	f	\N
71	2	5	7	\N	\N	f	\N
72	2	5	8	\N	\N	f	\N
73	3	5	9	\N	\N	f	\N
74	3	5	10	\N	\N	f	\N
75	3	5	11	\N	\N	f	\N
76	3	5	12	\N	\N	f	\N
77	4	5	13	\N	\N	f	\N
78	4	5	14	\N	\N	f	\N
79	4	5	15	\N	\N	f	\N
80	4	5	16	\N	\N	f	\N
81	1	6	1	\N	\N	f	\N
82	1	6	2	\N	\N	f	\N
83	1	6	3	\N	\N	f	\N
84	1	6	4	\N	\N	f	\N
85	2	6	5	\N	\N	f	\N
86	2	6	6	\N	\N	f	\N
87	2	6	7	\N	\N	f	\N
88	2	6	8	\N	\N	f	\N
89	3	6	9	\N	\N	f	\N
90	3	6	10	\N	\N	f	\N
91	3	6	11	\N	\N	f	\N
92	3	6	12	\N	\N	f	\N
93	4	6	13	\N	\N	f	\N
94	4	6	14	\N	\N	f	\N
95	4	6	15	\N	\N	f	\N
96	4	6	16	\N	\N	f	\N
5	2	1	5	2023-12-20	2023-12-28	t	Micheal@gmail.com
57	3	4	9	2023-12-13	2024-01-05	t	Micheal@gmail.com
58	3	4	10	\N	\N	f	\N
9	3	1	9	\N	\N	f	\N
6	2	1	6	\N	\N	f	\N
2	1	1	2	\N	\N	f	\N
\.


--
-- Data for Name: room_type; Type: TABLE DATA; Schema: Hotel; Owner: Hotel
--

COPY "Hotel".room_type (rt_id, rt_name, rt_desc, guest_capacity, price) FROM stdin;
1	Single	1 bed fit for 1 person fitted with amenitites	1	49
2	Double	1 double bed for 2 people fitted with amenitites	2	59
3	Twin	2 single beds fit for 2 people with amenities	2	59
4	Family	2 king sized beds along with 2 single beds fit for a family of 6	6	79
\.


--
-- Name: guests_booking_id_seq; Type: SEQUENCE SET; Schema: Hotel; Owner: Hotel
--

SELECT pg_catalog.setval('"Hotel".guests_booking_id_seq', 6, true);


--
-- Name: hotel_hotel_id_seq; Type: SEQUENCE SET; Schema: Hotel; Owner: Hotel
--

SELECT pg_catalog.setval('"Hotel".hotel_hotel_id_seq', 6, true);


--
-- Name: room_room_id_seq; Type: SEQUENCE SET; Schema: Hotel; Owner: Hotel
--

SELECT pg_catalog.setval('"Hotel".room_room_id_seq', 96, true);


--
-- Name: room_type_rt_id_seq; Type: SEQUENCE SET; Schema: Hotel; Owner: Hotel
--

SELECT pg_catalog.setval('"Hotel".room_type_rt_id_seq', 4, true);


--
-- Name: guest_account guest_account_pkey; Type: CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".guest_account
    ADD CONSTRAINT guest_account_pkey PRIMARY KEY (email);


--
-- Name: guests guests_pkey; Type: CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".guests
    ADD CONSTRAINT guests_pkey PRIMARY KEY (booking_id);


--
-- Name: hotel hotel_pkey; Type: CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".hotel
    ADD CONSTRAINT hotel_pkey PRIMARY KEY (hotel_id);


--
-- Name: room room_pkey; Type: CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".room
    ADD CONSTRAINT room_pkey PRIMARY KEY (room_id);


--
-- Name: room_type room_type_pkey; Type: CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".room_type
    ADD CONSTRAINT room_type_pkey PRIMARY KEY (rt_id);


--
-- Name: guests guests_room_id_fkey; Type: FK CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".guests
    ADD CONSTRAINT guests_room_id_fkey FOREIGN KEY (room_id) REFERENCES "Hotel".room(room_id);


--
-- Name: room room_hotel_id_fkey; Type: FK CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".room
    ADD CONSTRAINT room_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES "Hotel".hotel(hotel_id);


--
-- Name: room room_rt_id_fkey; Type: FK CONSTRAINT; Schema: Hotel; Owner: Hotel
--

ALTER TABLE ONLY "Hotel".room
    ADD CONSTRAINT room_rt_id_fkey FOREIGN KEY (rt_id) REFERENCES "Hotel".room_type(rt_id);


--
-- PostgreSQL database dump complete
--

