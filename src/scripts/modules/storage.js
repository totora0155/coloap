'use strict';

const remote = require('remote');
const app = remote.require('app');
// const electron = require('electron');
const co = require('co');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const pkg = require('../../../package.json');
const flow = require('./flow');
const util = require('./util');

const cache = {};
const enc = 'utf-8';

const file = {
  data: 'data.json',
}

class Storage {
  constructor() {
    this.data = null;
    this.dataDir = path.join(app.getPath('home'), `.${pkg.name}`);
    this.dataFile = path.join(this.dataDir, file.data);
  }

  get get() {
    const self = this;
    return co(function* () {
      const content = yield util.readFile(self.dataFile);
      self.data = JSON.parse(content);
      return self.data;
    });
  }

  save(data) {
    fs.writeFileSync(this.dataFile, data, enc);
  }
}

module.exports = new Storage();
