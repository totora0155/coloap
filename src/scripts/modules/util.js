'use strict';

const fs = require('fs');
const enc = 'utf-8';

const util = {
  readFile (filepath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, enc, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  },
  writeFile (filepath, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, content, enc, (err) => {
        if (err) return reject(err);
        return resolve(true);
      })
    });
  },
  // stat (filepath, cb) {
  //   return new Promise((resolve, reject) => {
  //     fs.stat(filepath, (err, stats) => {
  //       if (err) return reject(err);
  //       return resolve(cb(stats));
  //     });
  //   });
  // },
  existsDirectory (filepath) {
    return new Promise(resolve => {
      fs.stat(filepath, (err, stats) => {
        console.log(err, stats);
        if (err) return resolve(false);
        return resolve(stats.isDirectory());
      });
    });
  },
  existsFile (filepath) {
    return new Promise((resolve) => {
      fs.stat(filepath, (err, stats) => {
        if (err) return resolve(false);
        return resolve(stats.isFile());
      });
    });
  },
  mkdir (filepath) {
    return new Promise((resolve, reject) => {
      fs.mkdir(filepath, (err) => {
        if (err) return reject(err);
        return resolve(true);
      })
    });
  },
};

module.exports = util;
