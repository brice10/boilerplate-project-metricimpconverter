const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Get getNum with provided input', function () {

        test('should correctly read a whole number input', function () {
            let input = '45kg';
            const convertedValue = convertHandler.getNum(input);
            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue, 'The converted value must not be NaN');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.isTrue(Number.isInteger(convertedValue), 'The converted value must be an Integer');
            assert.equal(convertedValue, 45, 'The converted value must be equals to 45');
        });

        test('should correctly read a decimal number input', function () {
            let input = '4.5kg';
            const convertedValue = convertHandler.getNum(input);
            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue, 'The converted value must not be NaN');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.isFalse(Number.isInteger(convertedValue), 'The converted value must not be an Integer');
            assert.isTrue(convertedValue % 1 !== 0, 'The converted value must be a decimal number');
            assert.equal(convertedValue, 4.5, 'The converted value must be equals to 4.5');
        });

        test('should correctly read a fractional input', function () {
            let input = '1/2kg';
            const convertedValue = convertHandler.getNum(input);
            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue, 'The converted value must not be NaN');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.isFalse(Number.isInteger(convertedValue), 'The converted value must not be an Integer');
            assert.isTrue(convertedValue % 1 !== 0, 'The converted value must be a decimal number');
            assert.equal(convertedValue, 0.5, 'The converted value must be equals to 0.5');

            let input2 = '4/2kg';
            const convertedValue2 = convertHandler.getNum(input2);
            assert.isOk(convertedValue2, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue2, 'The converted value must not be NaN');
            assert.isNumber(convertedValue2, 'The converted value must be a number');
            assert.isTrue(Number.isInteger(convertedValue2), 'The converted value must be an Integer');
            assert.isFalse(convertedValue2 % 1 !== 0, 'The converted value must not be a decimal number');
            assert.equal(convertedValue2, 2, 'The converted value must be equals to 2');
        });

        test('should correctly read a fractional input with a decimal', function () {
            let input = '1.8/2kg';
            const convertedValue = convertHandler.getNum(input);
            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue, 'The converted value must not be NaN');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.isFalse(Number.isInteger(convertedValue), 'The converted value must not be an Integer');
            assert.isTrue(convertedValue % 1 !== 0, 'The converted value must be a decimal number');
            assert.equal(convertedValue, 0.9, 'The converted value must be equals to 0.9');

            let input2 = '1/0.25kg';
            const convertedValue2 = convertHandler.getNum(input2);
            assert.isOk(convertedValue2, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue2, 'The converted value must not be NaN');
            assert.isNumber(convertedValue2, 'The converted value must be a number');
            assert.isTrue(Number.isInteger(convertedValue2), 'The converted value must be an Integer');
            assert.isFalse(convertedValue2 % 1 !== 0, 'The converted value must not be a decimal number');
            assert.equal(convertedValue2, 4, 'The converted value must be equals to 0.9');
        });

        test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
            let input = '3/2/3kg';
            const convertedValue = convertHandler.getNum(input);
            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue, 'The converted value must not be NaN');
            assert.isNotNumber(convertedValue, 'The converted value must not be a number');
            assert.isString(convertedValue, 'The converted value must be a string');
            assert.equal(convertedValue, 'invalid number', "The converted value must be equals to 'invalid number'");
        });

        test('should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
            let input = 'kg';
            const convertedValue = convertHandler.getNum(input);
            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue, 'The converted value must not be NaN');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.isTrue(Number.isInteger(convertedValue), 'The converted value must be an Integer');
            assert.equal(convertedValue, 1, 'The converted value must be equals to 1');

            let input2 = '';
            const convertedValue2 = convertHandler.getNum(input2);
            assert.isOk(convertedValue2, 'The converted value must be truthy');
            assert.isNotNaN(convertedValue2, 'The converted value must not be NaN');
            assert.isNumber(convertedValue2, 'The converted value must be a number');
            assert.isTrue(Number.isInteger(convertedValue2), 'The converted value must be an Integer');
            assert.equal(convertedValue2, 1, 'The converted value must be equals to 1');
        });

    });

    suite('Get getUnit with provided input', function () {

        const validInputUnits = ['gal', 'km', 'lbs', 'kg', 'L', 'mi'];

        test('should correctly read each valid input unit', function () {
            const validInputs = ['4gal', '1/2km', '5.4/3lbs', 'kg', '1.3l', '4.5/2mi'];
            validInputs.forEach((input, i) => {
                const extractedUnit = convertHandler.getUnit(input);
                assert.isOk(extractedUnit, 'The extracted unit must be truthy');
                assert.isString(extractedUnit, 'The extracted unit must be a string');
                assert.equal(extractedUnit, validInputUnits[i], 'The extracted unit must be equals to ' + validInputUnits[i]);
            });

            const validInputs2 = ['4GAL', '1/2KM', '5.4/3LBS', 'KG', '1.3L', '4.5/2MI'];
            validInputs2.forEach((input, i) => {
                const extractedUnit = convertHandler.getUnit(input);
                assert.isOk(extractedUnit, 'The extracted unit must be truthy');
                assert.isString(extractedUnit, 'The extracted unit must be a string');
                assert.equal(extractedUnit, validInputUnits[i], 'The extracted unit must be equals to ' + validInputUnits[i]);
            });
        });

        test('should correctly return an error for an invalid input unit', function () {
            const invalidInputs = ['4gald', '1/2kmh4', '5.4/3lbs4', 'kgd', ' '];
            invalidInputs.forEach((input, i) => {
                const extractedUnit = convertHandler.getUnit(input);
                assert.isOk(extractedUnit, 'The extracted unit must be truthy');
                assert.isString(extractedUnit, 'The extracted unit must be a string');
                assert.equal(extractedUnit, 'invalid unit', 'Return an error for an invalid input unit');
            });
        });

        test('should return the correct return unit for each valid input unit', function () {
            const returnUnits = ['L', 'mi', 'kg', 'lbs', 'gal', 'km'];
            validInputUnits.forEach((unit, i) => {
                const returnUnit = convertHandler.getReturnUnit(unit);
                assert.isOk(returnUnit, 'The return unit must be truthy');
                assert.isString(returnUnit, 'The return unit must be a string');
                assert.equal(returnUnit, returnUnits[i], 'The return unit must be equals to ' + returnUnits[i]);
            });
        });

        test('should correctly return the spelled-out string unit for each valid input unit', function () {
            const spelledOutUnits = ['gallons', 'kilometers', 'pounds', 'kilograms', 'liters', 'miles'];
            validInputUnits.forEach((unit, i) => {
                const spellOutUnit = convertHandler.spellOutUnit(unit);
                assert.isOk(spellOutUnit, 'The spelled out unit must be truthy');
                assert.isString(spellOutUnit, 'The spelled out unit must be a string');
                assert.equal(spellOutUnit, spelledOutUnits[i], 'The spelled out unit must be equals to ' + spelledOutUnits[i]);
            });
        });

    });

    suite('Convert with number and unit', function () {

        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        test('should correctly convert gal to L', function () {
            const initNum = 1;
            const initUnit = 'gal';

            const convertedValue = convertHandler.convert(initNum, initUnit);
            const expectedValue = parseFloat((initNum * galToL).toFixed(5));

            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.equal(convertedValue, expectedValue, 'The converted value must be equals to ' + expectedValue);
        });

        test('should correctly convert L to gal', function () {
            const initNum = 1;
            const initUnit = 'l';

            const convertedValue = convertHandler.convert(initNum, initUnit);
            const expectedValue = parseFloat((initNum / galToL).toFixed(5));

            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.equal(convertedValue, expectedValue, 'The converted value must be equals to ' + expectedValue);
        });

        test('should correctly convert mi to km', function () {
            const initNum = 1;
            const initUnit = 'mi';

            const convertedValue = convertHandler.convert(initNum, initUnit);
            const expectedValue = parseFloat((initNum * miToKm).toFixed(5));

            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.equal(convertedValue, expectedValue, 'The converted value must be equals to ' + expectedValue);
        });

        test('should correctly convert km to mi', function () {
            const initNum = 1;
            const initUnit = 'km';

            const convertedValue = convertHandler.convert(initNum, initUnit);
            const expectedValue = parseFloat((initNum / miToKm).toFixed(5));

            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.equal(convertedValue, expectedValue, 'The converted value must be equals to ' + expectedValue);
        });

        test('should correctly convert lbs to kg', function () {
            const initNum = 1;
            const initUnit = 'lbs';

            const convertedValue = convertHandler.convert(initNum, initUnit);
            const expectedValue = parseFloat((initNum * lbsToKg).toFixed(5));

            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.equal(convertedValue, expectedValue, 'The converted value must be equals to ' + expectedValue);
        });

        test('should correctly convert kg to lbs', function () {
            const initNum = 1;
            const initUnit = 'kg';

            const convertedValue = convertHandler.convert(initNum, initUnit);
            const expectedValue = parseFloat((initNum / lbsToKg).toFixed(5));

            assert.isOk(convertedValue, 'The converted value must be truthy');
            assert.isNumber(convertedValue, 'The converted value must be a number');
            assert.equal(convertedValue, expectedValue, 'The converted value must be equals to ' + expectedValue);
        });

    });

});