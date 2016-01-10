'use strict';

const cheerio = require('cheerio');

var defaultName = 'unknown'

class Folder {
  static get defaultName() { return defaultName; }
  static set defaultName(name) { defaultName = name; }

  constructor (name, editMode) {
    this.name = name;
    this.data = [];
    this.editMode = editMode || false;
  }

  get get() {
    return this.data;
  }

  get render() {
    const $ = cheerio.load(`
      <li class="folder__item">
        <a class="folder__btn" role="button" data-name="${this.name}">
          <span class="octicon octicon-file-directory"></span>
          <span class="folder__name">${this.name}</span>
        </a>
      </li>
    `);
    if (this.editMode) {
      $.root().find('.folder__name')
        .attr('id', 'folderEditMode')
        .attr('contenteditable', true);
    }
    return $.html();
  }

  rename(name) {
    this.name = name;
  }

  add (color) {
    this.data.push(color);
  }
}

module.exports = Folder;
