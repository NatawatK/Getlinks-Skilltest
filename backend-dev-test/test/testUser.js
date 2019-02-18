process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Users', () => {
  before((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
  * Test the /user/register route
  */
  describe('/POST register', () => {
    it('it should create user on db', (done) => {
      let user = {
        username: "testuser01",
        password: "123456",
        email: "test@testmai.com"
      }
      chai.request(server)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          // done();
        });
      User.findOne({ username: user.username }, function (err, usr) {
        if (err) throw err;
        if (!user) throw new Error("Nodata")
        done();
      })
    });

  });
  /*
  Test Login 
  */
  // describe('/POST login', () => {
  //   it('it should login success', (done) => {
 
  //    let user = {
  //       username: "testuser01",
  //       password: "123456",
  //     }
  //     chai.request(server)
  //       .post('/user/login')
  //       .send(user)
  //       .end((err, res) => {
  //         // console.log('chai', res)
  //         // res.should.have.status(200);
  //         // res.body.should.have.json({ message: "login success" })
  //         done();
  //       });
  //   });
  // });
});

