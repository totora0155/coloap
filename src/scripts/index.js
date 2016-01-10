(() => {
  'use strict';

  const EventEmitter = require('events');
  const co = require('co');
  const remote = require('remote');
  const clipboard = require('electron').clipboard;
  const _ = require('./src/scripts/modules/custom-lodash');
  const alertify = require('alertify.js');
  const util = require('./src/scripts/modules/util');
  const flow = require('./src/scripts/modules/flow');
  const storage = require('./src/scripts/modules/storage');
  const rootFolder = require('./src/scripts/modules/root-folder');
  const Folder = require('./src/scripts/modules/folder');
  const Color = require('./src/scripts/modules/color');
  const Markup = require('./src/scripts/modules/markup');

  const currentWindow = remote.getCurrentWindow();

  const ev = {
    changeFolderHandler: (() => {
      const className = 'folder__btn-active';
      return (self, btns, e) => {
        if (self.classList.contains(className)) return;
        btns.forEach(btn => {
          btn.classList.remove(className);
        });
        self.classList.toggle(className);
        flow.emit('changed:folder', self.dataset.name);
      };
    })(),
    clickStarHandler: (() => {
      const className = 'color__star-btn--active';
      return (self, folder, e) => {
        const target = _.find(folder.get, {name: self.dataset.name});
        target.star = !target.star;
        self.classList.toggle(className);
      };
    })(),
    clickHexHandler(self, e) {
      clipboard.writeText(self.innerText);
      alertify.log('Copied!')
    },
  };

  const template = require('./src/scripts/modules/template');
  const folders = new Markup('folders', template.folders);
  const colors = new Markup('colors', template.colors);

  alertify.logPosition('right top');

  storage.get.then((data) => {
    Object.keys(data).forEach(foldername => {
      const folder = new Folder(foldername);
      rootFolder.add(folder);
      data[foldername].forEach(color => {
        folder.add(new Color(color.name, color.hex, color.star));
      });
    });

    console.log(rootFolder.get);

    const folderAddBtn = document.getElementById('folderAddBtn');
    folderAddBtn.addEventListener('click', () => {
      flow.emit('folder:add');
    }, false);
    flow.emit('folder:init');
  }).catch(err => {
    console.error(err);
  });

  flow.on('folder:init', () => {
    folders.render(rootFolder.folders);
    const btns = folders.find('.folder__btn');
    btns.forEach(btn => {
      const handler = ev.changeFolderHandler.bind(null, btn, btns);
      btn.addEventListener('click', handler, false);
    });
  });

  flow.on('changed:folder', (foldername, e) => {
    const folder = rootFolder.getFolder(foldername);
    const data = (() => {
      const grouped = _.groupBy(folder.get, color => {
        return color.isLight ? 'light' : 'dark';
      });
      grouped.light = grouped.light || [];
      grouped.dark = grouped.dark || [];
      return grouped;
    })();
    colors.render(data);

    const starBtns = colors.find('.color__star-btn');
    starBtns.forEach(btn => {
      const handler = ev.clickStarHandler.bind(null, btn, folder);
      btn.addEventListener('click', handler, false);
    });

    const valueBtns = colors.find('.color__value');
    valueBtns.forEach(btn => {
      const handler = ev.clickHexHandler.bind(null, btn);
      btn.addEventListener('click', handler, false);
    });
  });

  flow.on('folder:add', () => {
    const target = new Folder(Folder.defaultName, true);
    rootFolder.add(target);
    folders.render(rootFolder.folders);
    const elem = document.getElementById('folderEditMode');
    elem.innerText = '';
    elem.focus();
    elem.addEventListener('blur', (e) => {
      console.log(elem);
      elem.innerText = elem.innerText || Folder.defaultName;
      elem.removeAttribute('contenteditable');
      elem.removeAttribute('id');
      target.rename(elem.innerText);
      target.editMode = false;
      console.log(rootFolder.folders);
    flow.emit('folder:init');
    }, false);
  });

  currentWindow.on('close', () => {
    storage.save(JSON.stringify(rootFolder.get, null, 2));
  });

})();
