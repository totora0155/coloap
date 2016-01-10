'use strict';

class Folder {
  constructor (name) {
    this.name = name;
    this.data = [];
  }

  get get() {
    return this.data;
  }

  rename(name) {
    this.name = name;
  }

  add (color) {
    this.data.push(color);
  }
}

module.exports = Folder;
