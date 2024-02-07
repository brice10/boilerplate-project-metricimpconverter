const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    this.timeout(5000);

    test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                const resBody = res.body;

                assert.isOk(resBody);
                assert.isOk(resBody.initNum);
                assert.isOk(resBody.initUnit);
                assert.isOk(resBody.returnNum);
                assert.isOk(resBody.returnUnit);
                assert.isOk(resBody.string);

                assert.equal(resBody.initNum, 10);
                assert.equal(resBody.initUnit, 'L');
                assert.equal(resBody.returnNum, 2.64172);
                assert.equal(resBody.returnUnit, 'gal');
                assert.equal(resBody.string, '10 liters converts to 2.64172 gallons');

                done();
            });
    });

    test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
                done();
            });
    });

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
                done();
            });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            });
    });

    test('Convert with no number such as kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);

                const resBody = res.body;

                assert.isOk(resBody);
                assert.isOk(resBody.initNum);
                assert.isOk(resBody.initUnit);
                assert.isOk(resBody.returnNum);
                assert.isOk(resBody.returnUnit);
                assert.isOk(resBody.string);

                assert.equal(resBody.initNum, 1);
                assert.equal(resBody.initUnit, 'kg');
                assert.equal(resBody.returnNum, 2.20462);
                assert.equal(resBody.returnUnit, 'lbs');
                assert.equal(resBody.string, '1 kilograms converts to 2.20462 pounds');

                done();
            });
    });
});
