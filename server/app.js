const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(
    session({
        secret: 'cats',
        resave: true,
        saveUninitialized: true,
    }),
);
app.use(cookieParser('cats'));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig');

app.use(authRoutes);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(process.env.PORT, () => {
            console.log(`\nworking on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));
