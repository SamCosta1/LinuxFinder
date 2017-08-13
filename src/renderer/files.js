'use strict';
const watch = require('node-watch');
// const fs = require('fs-extra');
// const listenerHelper = require('./listenerHelper.js');

var dirs = new Map();
// var changeListeners = listenerHelper.newInstance();
// var removeListeners = listenerHelper.newInstance();

export function addOnChangeListener(listener) {
 //  changeListeners.listeners.push(listener);

};

export function addDir(path) {
   if (dirs.has(path)) {
      return;
   }
   dirs.set(path, addWatcher(path));
};

export function removeDir(path) {
   if (!dirs.has(path)) {
      return;
   }

   dirs.get(path).close();
   dirs.delete(path);
};

// startWatcher(searchPath);

function addWatcher(path) {
   const watcher = watch(path, {recursive: false});

   watcher.on('change', (event, name) => {

   });

   watcher.on('error', (event, name) => {

   });
}
/*
fs.readdir(searchPath, (err, files) => {
   if (err) return;

   for (var index in files) {
      fs.lstat(searchPath + '/' + files[index], (err, stats) => {
         console.log(stats.isDirectory(), stats.isSymbolicLink());
      });
   }
});
*/
