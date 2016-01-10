'use strict';

const _ = require('./custom-lodash');

class Markup {
  constructor (elemId, template) {
    this.element = document.getElementById(elemId);
    this.template = template;
  }

  get innerHTML() {
    return this.element.innerHTML;
  }

  render (data) {
    const template = _.template(this.template, _.templateSettings);
    this.insert(template({data}));
  }

  insert (html) {
    this.element.innerHTML = html;
  }

  find (query) {
    return [].slice.call(this.element.querySelectorAll(query), 0);
  }

  addEventListener (func) {

  }
}

module.exports = Markup;
