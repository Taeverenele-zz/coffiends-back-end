const mongoose = require('mongoose')
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./../index');
const should = chai.should();
const Coffee = require('../models/coffees')

chai.use(chaiHttp);


describe('Coffees', () => {
  
  before(async () => {
    await Coffee.deleteMany({});
  })

  after(async () => {
    await Coffee.deleteMany({});
  })

  // it("should connect and disconnect to mongodb")

  it('should list ALL coffees on /coffees GET', (done) => {
    chai.request(app)
      .get('/coffees')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('should add a SINGLE coffee on /coffees POST', (done) => {
    chai.request(app)
      .post('/coffees')
      .send({'name': 'test', 'description': 'test'})
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('_id');
        res.body.name.should.equal('test');
        res.body.description.should.equal('test');
        done();
      });
  });
  it('should update a SINGLE coffee on /coffees/<id> PUT', (done) => {
    chai.request(app)
      .get('/coffees')
      .end((err, res) => {
        chai.request(app)
          .put('/coffees/'+res.body[0]._id)
          .send({'name': 'test updated'})
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('_id');
            response.body.name.should.equal('test updated');
            done();
        });
      });
  });
  it('should delete a SINGLE coffee on /coffees/<id> DELETE', (done) => {
    chai.request(app)
      .get('/coffees')
      .end((err, res) => {
        chai.request(app)
          .delete('/coffees/'+res.body[0]._id)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            done();
        });
      });
  });
});

