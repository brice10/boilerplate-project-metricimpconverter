function ConvertHandler() {

  this.validInputUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
  this.returnUnits = ['L', 'gal', 'kg', 'lbs', 'km', 'mi'];
  this.spelledOutUnits = ['gallons', 'liters', 'pounds', 'kilograms', 'miles', 'kilometers'];

  this.getNum = function (input) {
    let result;
    if (input.includes('/') && input.split('/').length === 2) {
      const numerator = parseFloat(input.split('/')[0]);
      const denominator = parseFloat(input.split('/')[1]);
      if (!isNaN(numerator) && !isNaN(denominator)) {
        result = numerator / denominator;
      } else {
        result = 'invalid number';
      }
    } else if (input.includes('/') && input.split('/').length > 2) {
      result = 'invalid number';
    } else {
      const number = parseFloat(input);
      result = number || 1;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const unit = input.match(/[a-zA-Z]+$/);
    result = unit && this.validInputUnits.includes(unit[0].toLowerCase())
      ? unit[0].toLowerCase() === this.validInputUnits[1]
        ? unit[0].toUpperCase()
        : unit[0].toLowerCase()
      : 'invalid unit';
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = null;
    if (initUnit) {
      const index = this.validInputUnits.indexOf(initUnit.toLowerCase());
      result = index !== -1 ? this.returnUnits[index] : null;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = null;
    if (unit) {
      const index = this.validInputUnits.indexOf(unit.toLowerCase());
      result = index !== -1 ? this.spelledOutUnits[index] : null;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    const unitIndex = this.validInputUnits.indexOf(initUnit.toLowerCase());

    if (unitIndex === -1) {
      return null;
    }

    switch (unitIndex) {
      case 0: // gal to L
        result = initNum * galToL;
        break;
      case 1: // L to gal
        result = initNum / galToL;
        break;
      case 2: // lbs to kg
        result = initNum * lbsToKg;
        break;
      case 3: // kg to lbs
        result = initNum / lbsToKg;
        break;
      case 4: // mi to km
        result = initNum * miToKm;
        break;
      case 5: // km to mi
        result = initNum / miToKm;
        break;
      default:
        return null;
    }

    result = parseFloat(result.toFixed(5));

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };

}

module.exports = ConvertHandler;
