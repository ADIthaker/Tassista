const express = require('express');

const app = express();
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const isAuth = require('./middlewares/isAuth');
const protectedRoutes = require('./routes/protected');
const fileUpload = require('./utils/fileUpload');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 10000,
        keys: [process.env.COOKIE_KEY],
    }),
);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
    multer({
        storage: fileUpload.storage,
        fileFilter: fileUpload.fileFilter,
    }).single('file'),
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
        useFindAndModify: false,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`\nworking on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));
