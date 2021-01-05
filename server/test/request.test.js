const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/user');
const Driver = require('../models/driver');
const Request = require('../models/request');
const server = require('../app');
const driver = require('../models/driver');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
let userJwt;
let userpwd;
let driverpwd;
let driverJwt;
let reqId;
const makepwd = async () => {
    userpwd = await bcrypt.hash('soul', 10);
    driverpwd = userpwd;
};
makepwd();

describe('RIDES', () => {
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
        await Request.deleteMany({});
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
                userJwt.should.be.a('string');
                done();
            });
    });
    it('MAKE A REQUEST',(done) => {
        const req  = {
            dropLocation: '20,20',
            pickupLocation: '10,10',
            dropAddress:'Home',
            pickupAddress:'Office',
            timeOfArrival: '2020-10-28T05:21:03.667Z',
        };
        chai.request(server)
            .post('/request/new')
            .set('Authorization', `Bearer ${userJwt}`)
            .send(req)
            .end((err, res) => {
                console.log(res.body);
                reqId = res.body._id;
                expect(res.body.dropAddress).to.equal('Home');
                expect(res.body.dropLocation.location.coordinates).to.deep.equal([20,20]);
                expect(res.body.timeOfArrival).to.equal('2020-10-28T05:21:03.667Z');
                done();
            });
    });
    it('EDIT A REQUEST',(done)=>{
        const req  = {
            reqId: reqId,
            dropLocation: '30,20',
            pickupLocation: '10,10',
            dropAddress:'House',
            pickupAddress:'Office',
            timeOfArrival: '2020-10-28T05:21:03.667Z',
        };
        chai.request(server)
            .post('/request/edit')
            .set('Authorization', `Bearer ${userJwt}`)
            .send(req)
            .end((err, res) => {
                console.log(res.body);
                expect(res.body.dropAddress).to.equal('House');
                expect(res.body.dropLocation.location.coordinates).to.deep.equal([30,20]);
                expect(res.body.timeOfArrival).to.equal('2020-10-28T05:21:03.667Z');
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
                driverJwt.should.be.a('string');
                done();
            });
    });
    it('ACCEPT REQUEST BY DRIVER', (done) => {
        chai.request(server)
            .get(`/request/accept/${reqId}`)
            .set('Authorization', `Bearer ${driverJwt}`)
            .end((err, res) => {
                done();
            });
    });
    it('SHOW REQUEST BY DRIVER', (done) => {
        chai.request(server)
            .get(`/request`)
            .set('Authorization', `Bearer ${driverJwt}`)
            .end((err, res) => {
                done();
            });
    });
});
