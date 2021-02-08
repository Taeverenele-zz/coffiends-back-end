const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index');
const should = chai.should();
const Cafe = require('../models/cafes');
const User = require('../models/users');
const Coffee = require('../models/coffees');
chai.use(chaiHttp);

describe('Cafes', function() {
  before( async() => {
    await Cafe.deleteMany({});
    await User.deleteMany({});
    await Coffee.deleteMany({});
  });

  after(async () => {
    await Cafe.deleteMany({});
    await User.deleteMany({});
    await Coffee.deleteMany({});
  });

  it('should add a SINGLE cafe on /cafes POST', function(done) {
    chai.request(app).post('/users/register')
      .send({
        "username": "cafe@coffiends.com",
        "user_name": "Cafe Test User",
        "role": "cafe",
        "phone": "0412356789",
        "password": "password"
      })
      .end((err, res1) => {
        chai.request(app).post('/coffees')
          .send({'name': 'test', 'description': 'test'})
          .end((err, res2) => {
            chai.request(app).post('/cafes')
              .send({
                "cafe_name": "Cafe Post Test",
                "address": "123 Test St",
                "operating_hours": [ "0700", "1700" ],
                "location": [ -27.1, 153.04 ],
                "menu": [{
                  "coffeeId": res2.body._id,
                  "coffeeName": "covfefe name",
                  "coffeePrice": 6
                }],
                "owner": res1.body._id
              })
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('cafe_name');
                res.body.should.have.property('address');
                res.body.should.have.property('operating_hours');
                res.body.should.have.property('location');
                res.body.should.have.property('menu');
                res.body.should.have.property('owner');
                res.body.cafe_name.should.equal('Cafe Post Test');
                res.body.address.should.equal('123 Test St');
                res.body.operating_hours[0].should.equal("0700");
                res.body.operating_hours[1].should.equal("1700");
                res.body.location[0].should.equal(-27.1);
                res.body.location[1].should.equal(153.04);
                res.body.menu[0].coffeeId.should.be.equal(res2.body._id);
                res.body.menu[0].coffeeName.should.be.equal("covfefe name");
                res.body.menu[0].coffeePrice.should.be.equal(6);
                res.body.owner.should.equal(res1.body._id);
                done();
              });
          });
      });
  });

  it('should list ALL cafes on /cafes GET', (done) => {
    chai.request(app)
      .get('/cafes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should update a SINGLE cafe on /cafes/<id> PUT', (done) => {
    chai.request(app).get('/cafes')
      .end((err, res) => {
        chai.request(app).put('/cafes/'+res.body[0]._id)
          .send({
            "cafe_name": "Cafe PUT Test UPDATED",
            "address": "Gurgle Gurgle Down The Drain",
            "operating_hours": [ "0700", "1700" ],
            "location": [ -27.1, 153.04 ],
            "menu": [{
              "coffeeId": res.body[0]._id,
              "coffeeName": "covfefe name",
              "coffeePrice": 99
            }],
            "owner": res.body[0]._id
          })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('_id');
            response.body.should.have.property('cafe_name');
            response.body.should.have.property('address');
            response.body.should.have.property('operating_hours');
            response.body.should.have.property('location');
            response.body.should.have.property('menu');
            response.body.should.have.property('owner');
            response.body.cafe_name.should.equal('Cafe PUT Test UPDATED');
            response.body.address.should.equal('Gurgle Gurgle Down The Drain');
            response.body.menu[0].coffeePrice.should.be.equal(99);
            done();
        });
      });
  });

  it('should delete a SINGLE cafe on /cafes/<id> DELETE', (done) => {
    chai.request(app).get('/cafes')
      .end((err, res) => {
        chai.request(app).delete('/cafes/'+res.body[0]._id)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            done();
        });
      });
  });
});

