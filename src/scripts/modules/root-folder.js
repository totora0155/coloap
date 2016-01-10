'use strict';

class RootFolder {
  constructor() {
    this.folders = {};
  }

  get (name) {
    return this.folders[name];
  }

  add (folder) {
    this.folders[folder.name] = folder;
  }
}

module.exports = new RootFolder();
