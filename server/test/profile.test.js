const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/user');
const Driver = require('../models/driver');
const server = require('../app');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
let userJwt;
let userpwd;
let driverpwd;
let driverJwt;
const makepwd = async () => {
    userpwd = await bcrypt.hash('soul', 10);
    driverpwd = userpwd;
};
makepwd();

describe('Protected', () => {
    before((done) => {
        db.db()
            .then(() => {
                const user = new User({
                    email: 'newemail@email.com',
                    password: userpwd,
                    username: 'leave my',
                    phoneNo: '1234567890',
                });
                return user.save();
            })
            .then(() => {
                const driver = new Driver({
                    email: 'newemail@email.com',
                    password: driverpwd,
                    username: 'leave my',
                    phoneNo: '1234567890',
                });
                return driver.save();
            })
            .then(() => done());
    });
    after(async () => {
        await User.remove({});
        await Driver.deleteMany({});
        await db.close();
    });
    it('LOGIN USER', (done) => {
        const user = {
            email: 'newemail@email.com',
            password: 'soul',
        };
        chai.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                userJwt = res.body.token;
                done();
            });
    });
    it('Update a profile USER', (done) => {
        const updatedUser = {
            username: 'hello bro',
            phoneNo: '1234576890',
            address: 'Home',
        };
        console.log(userJwt);
        chai.request(server)
            .post('/user/profile/update')
            .set('Authorization', `Bearer ${userJwt}`)
            .send(updatedUser)
            .end((err, res) => {
                console.log(res.body);
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
    it('LOGIN DRIVER', (done) => {
        const user = {
            email: 'newemail@email.com',
            password: 'soul',
        };
        chai.request(server)
            .post('/driver/login')
            .send(user)
            .end((err, res) => {
                driverJwt = res.body.token;
                console.log(driverJwt);
                done();
            });
    });
    it('Update a profile DRIVER', (done) => {
        const updatedDriver = {
            username: 'heyyya a',
            phoneNo: '1234567190',
            address: 'House',
        };
        chai.request(server)
            .post('/driver/profile/update')
            .set('Authorization', `Bearer ${driverJwt}`)
            .send(updatedDriver)
            .end((err, res) => {
                console.log(res.body);
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});
