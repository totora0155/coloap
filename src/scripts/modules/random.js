'use strict'

class Random {
  get get41to50() {
    return Math.floor(Math.random() * 10 + 41);
  }

  get get360() {
    return Math.floor(Math.random() * 360);
  }
}

module.exports = new Random();
