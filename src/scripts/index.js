(() => {
  'use strict';

  const EventEmitter = require('events');
  const co = require('co');
  const clipboard = require('electron').clipboard;
  const _ = require('./src/scripts/modules/custom-lodash');
  const util = require('./src/scripts/modules/util');
  const flow = require('./src/scripts/modules/flow');
  const storage = require('./src/scripts/modules/storage');
  const rootFolder = require('./src/scripts/modules/root-folder');
  const Folder = require('./src/scripts/modules/folder');
  const Color = require('./src/scripts/modules/color');
  const Markup = require('./src/scripts/modules/markup');

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
      return (self, e) => {
        self.classList.toggle(className);
      };
    })(),
    clickHexHandler(self, e) {
      clipboard.writeText(self.innerText);
    },
  };

  const t1 = new Color('foo', '#bc002d');
  const t2 = new Color('foo', '#4c9e72');
  const t3 = new Color('foo', '#4285f4');
  const t4 = new Color('foo', '#f15723');
  const t5 = new Color('foo', '#73abd3');
  const t6 = new Color('foo', '#f5da55');

  const foo = new Folder('foo');
  const bar = new Folder('bar');
  const baz = new Folder('baz');

  foo.add(t1);
  foo.add(t2);
  foo.add(t3);
  foo.add(t4);
  foo.add(t5);
  foo.add(t6);

  rootFolder.add(foo);
  rootFolder.add(bar);
  rootFolder.add(baz);

  console.log(storage);

  storage.get.then(() => {
    console.log(storage.data);
  });

  co(function* () {
    const folderAddBtn = document.getElementById('folderAddBtn');
    folderAddBtn.addEventListener('click', Folder.addNew());
    flow.emit('inited');
  }).catch(err => {
    console.error(err);
  });

  flow.on('inited', () => {
    co(function* () {
      const template =
        yield util.readFile('./src/scripts/templates/folders.html');
      const folderElem = new Markup('folders', template);
      folderElem.render(rootFolder.folders);

      const btns = folderElem.find('.folder__btn');
      btns.forEach(btn => {
        const handler = ev.changeFolderHandler.bind(null, btn, btns);
        btn.addEventListener('click', handler, false);
      });
    }).catch(err => {
      console.error(err);
    });
  });

  flow.on('changed:folder', (foldername, e) => {
    co(function *() {
      const template =
        yield util.readFile('./src/scripts/templates/colors.html');
      const colorElem = new Markup('colors', template);
      const folder = rootFolder.get(foldername);
      const colors = _.groupBy(folder.get, color => {
        return color.isLight ? 'light' : 'dark';
      });
      colorElem.render(colors);

      const starBtns = colorElem.find('.color__star-btn');
      starBtns.forEach(btn => {
        const handler = ev.clickStarHandler.bind(null, btn);
        btn.addEventListener('click', handler, false);
      });

      const valueBtns = colorElem.find('.color__value');
      valueBtns.forEach(btn => {
        const handler = ev.clickHexHandler.bind(null, btn);
        btn.addEventListener('click', handler, false);
      });
    });
  });

})();
