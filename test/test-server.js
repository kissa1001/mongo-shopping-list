var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });

    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    it('should delete an item on delete', function(done) {
        var index = 0;
        var deletedName = storage.items[index]['name'];
        chai.request(app)
            .delete('/items/' + index)
            .send({'id': index})
            .end(function(err, response) {
                should.equal(err, null);
                response.should.have.status(201);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('id');
                response.body.name.should.be.a('string');
                response.body.id.should.be.a('number');
                response.body.name.should.equal(deletedName);
                storage.items.should.be.a('array');
                storage.items.should.have.length(3);
                storage.items[1].should.be.a('object');
                storage.items[1].should.have.property('name');
                storage.items[1].should.have.property('id');
                storage.items[1].id.should.be.a('number');
                storage.items[1].name.should.be.a('string');
                storage.items[1].name.should.equal('Peppers');
                done();
            });
    });

    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/1')
            .send({'id': '1', 'name': 'Blah'})
            .end(function(err, response) {
                should.equal(err, null);
                response.should.have.status(201);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('id');
                response.body.name.should.be.a('string');
                response.body.id.should.be.a('number');
                response.body.name.should.equal('Beets');
                storage.items.should.be.a('array');
                storage.items.should.have.length(3);
                storage.items[0].should.be.a('object');
                storage.items[0].should.have.property('name');
                storage.items[0].should.have.property('id');
                storage.items[0].id.should.be.a('number');
                storage.items[0].name.should.be.a('string');
                storage.items[0].name.should.equal('Blah');
                done();
            });
    });
});

