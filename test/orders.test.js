const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index');
const should = chai.should();
const Order = require('../models/orders');
const Cafe = require('../models/cafes');
const User = require('../models/users');
chai.use(chaiHttp);

describe('Orders', function() {
  before( async() => {
    await Order.deleteMany({});
    await Cafe.deleteMany({});
    await User.deleteMany({});
  });

  after(async () => {
    await Order.deleteMany({});
    await Cafe.deleteMany({});
    await User.deleteMany({});
  });

  it('should add a SINGLE Order on /orders/success GET using query params', function(done) {
    chai.request(app)
    .post('/users/register')
    .send({
      "username": "user@coffiends.com",
      "user_name": "Test User",
      "role": "cafe",
      "phone": "0412356789",
      "password": "password"
    })
    .end((err, userResponse) => {
      chai.request(app)
        .post('/cafes')
        .send({
          "cafe_name": "Cafe Post Test",
          "address": "123 Test St",
          "operating_hours": [ "0700", "1700" ],
          "location": [ -27.1, 153.04 ],
          "menu": [{
            "coffeeId": "60212bd0ec9d8a1cfa233aaf",
            "coffeeName": "covfefe name",
            "coffeePrice": 6
          }],
          "owner": userResponse.body._id
        })
        .end((err, cafeResponse) => {

          let queryUser = userResponse.body._id;
          let queryCafe = cafeResponse.body._id;
          let queryCoffee = "Espresso";
          let querySize = "Regular";
          let queryMilk = "Soy";
          let querySugar = 2;
          let queryPickup_time = "09:30";
          let queryTotal = 3.5
          
          chai.request(app).get(`/orders/success/?user=${queryUser}&cafe=${queryCafe}&coffee=${queryCoffee}&size=${querySize}&milk=${queryMilk}&sugar=${querySugar}&time=${queryPickup_time}&total=${queryTotal}`)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.redirects[0].should.equal('http://localhost:3000/orders');
              // res.body.should.have.property('_id');
              // res.body.should.have.property('cafe');
              // res.body.should.have.property('user');
              // res.body.should.have.property('order_date');
              // res.body.should.have.property('active');
              // res.body.should.have.property('coffee');
              // res.body.should.have.property('size');
              // res.body.should.have.property('milk');
              // res.body.should.have.property('sugar');
              // res.body.should.have.property('pickup_time');
              // res.body.should.have.property('total');
              // res.body.cafe.should.equal(queryCafe);
              // res.body.user.should.equal(queryUser);
              // res.body.order_date.should.be.a("string");
              // res.body.active.should.equal(true);
              // res.body.coffee.should.equal('Espresso');
              // res.body.size.should.equal('Regular');
              // res.body.milk.should.equal('Soy');
              // res.body.sugar.should.equal(2);
              // res.body.pickup_time.should.equal('09:30');
              // res.body.total.should.equal(3.5);
              done();
            });
        });
    });
  });

  it('should update a SINGLE order on /orders/<id> PUT', (done) => {
    const res = Order.find()
    res.then(allOrders => {
        chai.request(app).put('/orders/'+allOrders[0]._id)
          .send({
            "cafe": allOrders[0].cafe,
            "user": allOrders[0].user,
            "order_date": allOrders[0].order_date,
            "active": false,
            "coffee": allOrders[0].coffee,
            "size": allOrders[0].size,
            "milk": allOrders[0].milk,
            "sugar": allOrders[0].sugar,
            "pickup_time": allOrders[0].pickup_time,
            "total": allOrders[0].total
          })
          .end((error, response) => {
            response.should.have.status(201);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('_id');
            response.body.should.have.property('cafe');
            response.body.should.have.property('user');
            response.body.should.have.property('order_date');
            response.body.should.have.property('active');
            response.body.should.have.property('coffee');
            response.body.should.have.property('size');
            response.body.should.have.property('milk');
            response.body.should.have.property('sugar');
            response.body.should.have.property('pickup_time');
            response.body.should.have.property('total');
            response.body.active.should.equal(false);
            done();
        });
      });
  });
});
