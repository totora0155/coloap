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

const files = {
  data: 'data.json',
  state: 'state.json',
  config: 'config.json',
}

const initialData = JSON.stringify({
  "sns": [
    {
      name: 'twitter',
      hex: '55acee',
      star: false
    },
    {
      name: 'facebook',
      hex: '3b5998',
      star: false
    }
  ]
}, null, 2);

const initialState = JSON.stringify({
  currentFolder: "sns"
}, null, 2)

// const initialConfig = JSON.stringify({}, null, 2);

class Storage {
  constructor() {
    this.data = null;
    this.config = null;
    this.state
    this.dataDir = path.join(app.getPath('home'), `.${pkg.name}`);
    this.stateFile = path.join(this.dataDir, files.state);
    this.dataFile = path.join(this.dataDir, files.data);
    this.configFile = path.join(this.dataDir, files.config);
  }

  get get() {
    const self = this;
    return co(function* () {
      const data = yield util.readFile(self.dataFile);
      const state = yield util.readFile(self.stateFile);
      self.data = JSON.parse(data);
      self.state = JSON.parse(state);
      return {data: self.data, state: self.state, config: {}};
    }).catch(err => {
      co(function* () {
        const dir = yield util.existsDirectory(self.dataDir);
        if (!dir) yield util.mkdir(self.dataDir);

        (filepath => {
          co(function* () {
            const data = yield util.existsFile(filepath);
            if (!data) yield util.writeFile(filepath, initialData);
          });
        })(path.join(self.dataDir, files.data));

        (filepath => {
          co(function* () {
            const data = yield util.existsFile(filepath);
            if (!data) yield util.writeFile(filepath, initialState);
          });
        })(path.join(self.dataDir, files.state));
        flow.emit('init');
      });
    });
  }

  save(data) {
    const key = Object.keys(data)[0];
    const json = data[key]
    const filepath = path.join(this.dataDir, files[key]);
    fs.writeFileSync(filepath, JSON.stringify(json, null, 2), data, enc);
  }

  // saveData(data, config) {
  //   fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2), enc);
  //   fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2), enc);
  // }
}

module.exports = new Storage();
