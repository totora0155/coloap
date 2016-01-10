'use strict';

const random = require('./random');

const _ = {
  template: require('lodash.template'),
  templateSettings: require('lodash.templatesettings'),
  forEach: require('lodash.foreach'),
  map: require('lodash.map'),
  find: require('lodash.find'),
  merge: require('lodash.merge'),
  groupBy: require('lodash.groupby'),
}

_.merge(_.templateSettings.imports._, _);
_.merge(_.templateSettings.imports, {random});

module.exports = _;
