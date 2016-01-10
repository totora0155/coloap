'use strict';

const _ = require('./custom-lodash');

class RootFolder {
  constructor() {
    this.folders = [];
  }

  get (name) {
    return _.find(this.folders, {name});
  }

  add (folder) {
    this.folders.push(folder);
  }
}

module.exports = new RootFolder();
