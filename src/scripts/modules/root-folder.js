'use strict';

const _ = require('./custom-lodash');

class RootFolder {
  constructor() {
    this.currentFolder = null;
    this.folders = [];
  }

  get getData() {
    let data = {};
    this.folders.forEach(folder => {
      data[folder.name] = _.map(folder.get, color => color.get);
    });
    return data;
  }

  get getState() {
    let data = {};
    data.currentFolder = this.currentFolder;
    return data;
  }

  getFolder (name) {
    this.currentFolder = _.find(this.folders, {name});
    return this.currentFolder;
  }

  find (name) {
    return _.find(this.folders, {name});
  }

  add (folder) {
    this.folders.push(folder);
    folder.parent = this;
  }

  delete (folder) {
    this.folders = _.filter(this.folders, f => f.name !== folder.name);
  }
}

module.exports = new RootFolder();
