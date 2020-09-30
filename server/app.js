const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth');
const isAuth = require('./middlewares/isAuth');
const protectedRoutes = require('./routes/protected');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY],
    }),
);
app.use(passport.initialize());
app.use(passport.session());
// require('./config/passportConfig')(passport);
require('./config/passportOauthConfig')(passport);
// require('./config/passportOauthDriver')(passport);
// require('./config/passportJwt')(passport);

app.use(authRoutes);
app.use(isAuth.isTokenAuth, isAuth.isOAuth, protectedRoutes);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`\nworking on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));
