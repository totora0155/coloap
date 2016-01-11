'use strict';

const remote = require('remote');
const Menu = remote.Menu;
const cheerio = require('cheerio');
const flow = require('./flow');

var defaultName = 'unknown'
class Folder {
  static get defaultName() { return defaultName; }
  static set defaultName(name) { defaultName = name; }

  constructor (name, editMode) {
    this.name = name;
    this.data = [];
    this.editMode = editMode || false;
    this.selected = false;
    this.parent = null;
  }

  get get() {
    return this.data;
  }

  get render() {
    const $ = cheerio.load(`
      <li class="folder__item" data-name="${this.name}">
        <a class="folder__btn" role="button" data-name="${this.name}">
          <span class="octicon octicon-file-directory"></span>
          <span class="folder__name">${this.name}</span>
        </a>
      </li>
    `);
    if (this.editMode) {
      $('.folder__name')
        .attr('id', 'folderEditMode')
        .attr('contenteditable', true);
    }

    if (this.selected) {
      $('.folder__btn').addClass('folder__btn-active');
    }

    return $.html();
  }

  get menuTemplate () {
    const template = [
      {
        label: 'Rename',
        click: () => {
          this.editMode = true;
          flow.emit('folder:init');
        }
      },
      {
        label: 'Delete',
        click: () => {
          this.parent.delete(this);
          flow.emit('save:data');
          flow.emit('folder:init');
        }
      }
    ]
    return template;
  }

  rename (name) {
    this.name = name;
  }

  add (color) {
    this.data.push(color);
  }
}

module.exports = Folder;
