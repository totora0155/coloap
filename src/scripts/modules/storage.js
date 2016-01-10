'use strict';

const remote = require('remote');
const app = remote.require('app');
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
  }

  get get() {
    const self = this;
    return co(function* () {
      const filepath = path.join(self.dataDir, file.data);
      const content = yield util.readFile(filepath);
      self.data = JSON.parse(content);
      flow.emit('readed:data', self.data);
    });
  }
}

module.exports = new Storage();
