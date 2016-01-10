'use strict';

const remote = require('remote');
const app = remote.require('app');
const fs = require('fs');
const path = require('path');
const Kolor = require('color');
const random = require('./random');
// const EventEmitter = require('events');
// const pkg = require('pkg');
// const storage = require('storage');
// const cache = require('./cache');

class Color {
  static luminosity() {
    return Kolor('#' + this.hex).luminosity();
  }

  constructor (name, hex) {
    this.name = name;
    this.hex= hex[0] === '#' ? hex.substr(1) : hex;
    this.star = false;
  }

  get inport() {
    return {
      // id: this.id,
      name: this.name,
      color: this.hex,
    };
  }

  get render() {
    return `
      <li class="display__item">
        <dl class="color__box">
          <dt role="button" class="color__value">${this.hex}
          <dd class="color__sample" style="
            background-color: ${'#' + this.hex};
            border-radius: ${random.get41to50}% ${random.get41to50}% ${random.get41to50}% ${random.get41to50}% / ${random.get41to50}% ${random.get41to50}% ${random.get41to50}% ${random.get41to50}%;
            transform: rotate(${random.get360}deg);
          "></dd>
          <span role="button" class="color__star-btn octicon octicon-star"></span>
        </dl>
        <div class="display__name">${this.name}</div>
      </li>
    `;
  }

  get hue() {
    return Kolor('#' + this.hex).hsl().h;
  }

  get isLight() {
    return Kolor('#' + this.hex).luminosity() > 0.5 ? true : false
  }


  update() {
  }

  save() {
    storage.read('colors', this.inport);
  }

  delete() {
  }
}

module.exports = Color;
