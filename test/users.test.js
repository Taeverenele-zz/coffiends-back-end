const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index');
const should = chai.should();
const User = require('../models/users');
chai.use(chaiHttp);

describe('Users', function() {
  before( async() => {
    await User.deleteMany({});
  });

  after(async () => {
    await User.deleteMany({});
  });

  it('should add a SINGLE user on /users/register POST', function(done) {
    chai.request(app).post('/users/register')
      .send({
        "username": "user@test.com",
        "user_name": "Test User",
        "role": "user",
        "phone": "0412356789",
        "password": "password"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('user_name');
        res.body.should.have.property('role');
        res.body.should.have.property('phone');
        res.body.username.should.equal('user@test.com');
        res.body.user_name.should.equal('Test User');
        res.body.role.should.equal("user");
        res.body.phone.should.equal("0412356789");
        done();
      });
  });

  
  it('should update a SINGLE user on /users/<id> PATCH', (done) => {
    const res = User.find()
    res.then(allUsers => {
        chai.request(app).patch('/users/'+allUsers[0]._id)
          .send({
            "username": "user@test.com",
            "user_name": "Test User updated",
            "phone": "33",
          })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('_id');
            response.body.should.have.property('username');
            response.body.should.have.property('user_name');
            response.body.should.have.property('role');
            response.body.should.have.property('phone');
            response.body.user_name.should.equal('Test User updated');
            response.body.phone.should.equal('33');
            done();
        });
      });
  });

  it('should delete a SINGLE user on /users/<id> DELETE', (done) => {
    const res = User.find()
    res.then(allUsers => {
      chai.request(app).delete('/users/'+allUsers[0]._id)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          done();
      });
    });
  });
});
