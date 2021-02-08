const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index');
const should = chai.should();
const Cafe = require('../models/cafes');
chai.use(chaiHttp);

describe('Cafes', function() {
  before( async() => {
    await Cafe.deleteMany({});
  });

  after(async () => {
    await Cafe.deleteMany({});
  });

  it('should add a SINGLE cafe on /cafes POST', function(done) {
    chai.request(app)
      .post('/cafes')
      .send({
        "cafe_name": "Cafe Post Test",
        "address": "123 Test St",
        "operating_hours": [ "0700", "1700" ],
        "location": [ -27.1, 153.04 ],
        "menu": [{
          "coffeeId": "602121f21d2372159990902e",
          "coffeeName": "covfefe name",
          "coffeePrice": 6
        }],
        "owner": "602121f21d2372159990902e"
      })
      .end(function(err, res){
        console.log(res.body)
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('cafe_name');
        res.body.should.have.property('address');
        res.body.should.have.property('operating_hours');
        res.body.should.have.property('location');
        res.body.should.have.property('menu');
        res.body.should.have.property('owner');
        res.body.should.have.property('_id');
        res.body.cafe_name.should.equal('Cafe Post Test');
        res.body.address.should.equal('123 Test St');
        res.body.operating_hours[0].should.equal("0700");
        res.body.operating_hours[1].should.equal("1700");
        res.body.location[0].should.equal(-27.1);
        res.body.location[1].should.equal(153.04);
        res.body.menu[0].coffeeId.should.be.equal("602121f21d2372159990902e");
        res.body.menu[0].coffeeName.should.be.equal("covfefe name");
        res.body.menu[0].coffeePrice.should.be.equal(6);
        res.body.owner.should.equal("602121f21d2372159990902e");
        done();
      });
  });
});

