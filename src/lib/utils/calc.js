const BigNumber = require('bignumber.js')

const calc = {
  sum (...args) { return BigNumber.sum(...args).toNumber() },
  minus (a, b) { return BigNumber(a).minus(BigNumber(b)).toNumber() },
  multiply (a, b) { return BigNumber(a).multipliedBy(BigNumber(b)).toNumber() },
  divide (a, b) { return BigNumber(a).dividedBy(BigNumber(b)).toNumber() },
  isFinite: a => BigNumber(a).isFinite(),
  isValuable: a => BigNumber(a).isFinite() && !BigNumber(a).isZero(),
  inclVAT (price, vat) {
    return BigNumber(price).multipliedBy(BigNumber.sum(1, BigNumber(vat).dividedBy(100))).toNumber()
  },
  exclVAT (price, vat) {
    return BigNumber(price).dividedBy(BigNumber.sum(1, BigNumber(vat).dividedBy(100))).toNumber()
  }
}

module.exports = calc
