'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', function (req, res) {
    const input = req.query.input || '';

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    let stringResult;
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      stringResult = 'invalid number and unit';
    } else if (initNum === 'invalid number') {
      stringResult = initNum;
    } else if (initUnit === 'invalid unit') {
      stringResult = initUnit;
    }
    if (stringResult)
      return res.type('txt').send(stringResult);

    const spellOutInitUnit = convertHandler.spellOutUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spellOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    const string = convertHandler.getString(initNum, spellOutInitUnit, returnNum, spellOutReturnUnit);

    const data = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    };

    return res.json(data);
  })

};
