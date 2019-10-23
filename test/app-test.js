const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('register new user', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/register')
      .send({ username: 'vihang', password: 'vihangmi' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        authToken = res.body.token;
        done();
      });
  });
  it('should handle missing username', (done) => {
    chai.request(app)
      .post('/register')
      .send({ password: 'vihangmi' })
      .end((err, res) => {
        res.should.have.status(401);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'Missing credentials to register please add username and password');
        done();
      });
  });
  it('should handle missing password', (done) => {
    chai.request(app)
      .post('/register')
      .send({ username: 'vihang' })
      .end((err, res) => {
        res.should.have.status(401);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'Missing credentials to register please add username and password');
        done();
      });
  });
});

describe('login user', () => {
  it('should login user', (done) => {
    chai.request(app)
      .post('/login')
      .send({ username: 'vihang', password: 'vihangmi' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        authToken = res.body.token;
        done();
      });
  });
  it('should handle missing username', (done) => {
    chai.request(app)
      .post('/login')
      .send({ password: 'vihangmi' })
      .end((err, res) => {
        res.should.have.status(401);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'Missing credentials to register please add username and password');
        done();
      });
  });
  it('should handle missing password', (done) => {
    chai.request(app)
      .post('/login')
      .send({ username: 'vihang' })
      .end((err, res) => {
        res.should.have.status(401);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'Missing credentials to register please add username and password');
        done();
      });
  });
  it('should handle incorrect password', (done) => {
    chai.request(app)
      .post('/login')
      .send({ username: 'vihang', password: 'someOtherPassword' })
      .end((err, res) => {
        res.should.have.status(401);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'Invalid Password please check your password');
        done();
      });
  });
  it('should handle case where user is not registered', (done) => {
    chai.request(app)
      .post('/login')
      .send({ username: 'differentUser', password: 'anyPassowrd' })
      .end((err, res) => {
        res.should.have.status(403);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'Username does not exists');
        done();
      });
  });
});

describe('Third party Api should connect with webhook', () => {
  it('should be able to successfully connect', (done) => {
    chai.request(app)
      .post('/getStocksHook')
      .send({ ticker: 'GOOG', price: 240.67 })
      .end((err, res) => {
        res.should.have.status(200);
        expect('Content-Type', '/html/');
        expect(res).to.be.a('object', 'OK');
        done();
      });
  });
});
