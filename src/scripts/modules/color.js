'use strict';

const remote = require('remote');
const app = remote.require('app');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const Kolor = require('color');
const random = require('./random');

class Color {
  static luminosity() {
    return Kolor('#' + this.hex).luminosity();
  }

  constructor (name, hex, star) {
    this.name = name;
    this.hex= hex[0] === '#' ? hex.substr(1) : hex;
    this.star = star || false;
  }

  get get() {
    return {
      name: this.name,
      hex: this.hex,
      star: this.star,
    };
  }

  get render() {
    const $ = cheerio.load(`
      <li class="display__item">
        <dl class="color__box">
          <dt role="button" class="color__value">${this.hex}
          <dd class="color__sample" style="
            background-color: ${'#' + this.hex};
            border-radius: ${random.get41to50}% ${random.get41to50}% ${random.get41to50}% ${random.get41to50}% / ${random.get41to50}% ${random.get41to50}% ${random.get41to50}% ${random.get41to50}%;
            transform: rotate(${random.get360}deg);
          "></dd>
          <span role="button" class="color__star-btn octicon octicon-star" data-name="${this.name}"></span>
        </dl>
        <div class="display__name">${this.name}</div>
      </li>
    `);
    console.log(this);
    if (this.star) $('.color__star-btn').addClass('color__star-btn--active');
    return $.html();
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
