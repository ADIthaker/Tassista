const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../config/db');
const User = require('../models/user');
const Driver = require('../models/driver');
const server = require('../app');
const bcrypt = require('bcryptjs');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe('Authentication', () => {
    before((done) => {
        db.db().then(() => done());
    });
    after(async () => {
        await User.remove({});
        await Driver.deleteMany({});
        await db.close();
    });
    it('REGISTER USER', (done) => {
        const user = {
            email: 'newemail@email.com',
            password: 'soul',
            username: 'leave my',
            phoneNo: '1234567890',
        };
        chai.request(server)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.be.a('object');
                expect(res.body).to.deep.equal({
                    email: 'newemail@email.com',
                    password: 'soul',
                });
                done();
            });
    });
    it('REGISTER DRIVER', (done) => {
        const user = {
            email: 'newemail@email.com',
            password: 'soul',
            username: 'leave my',
            phoneNo: '1234567890',
        };
        chai.request(server)
            .post('/driver/register')
            .send(user)
            .end((err, res) => {
                res.should.be.a('object');
                expect(res.body).to.deep.equal({
                    email: 'newemail@email.com',
                    password: 'soul',
                });
                done();
            });
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
                res.should.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.type).to.equal('user');
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
                res.should.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.type).to.equal('driver');
                done();
            });
    });
});
