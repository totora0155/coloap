'use strict';

const _ = require('./custom-lodash');

class RootFolder {
  constructor() {
    this.folders = [];
  }

  get get() {
    let data = {};
    this.folders.forEach(folder => {
      data[folder.name] = _.map(folder.get, color => color.get);
    });
    return data;
  }

  getFolder (name) {
    return _.find(this.folders, {name});
  }

  add (folder) {
    this.folders.push(folder);
  }
}

module.exports = new RootFolder();
