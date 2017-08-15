'use strict';
import * as observers from './observer-helper';

const watch = require('node-watch');
const fs = require('fs-extra');

var errorHandler;

export function setErrorHandler(handler) {
   errorHandler = handler;
}

export function addObserver(path, changeListener, removeListener) {
   var observer = observers.newObserver(path, changeListener, removeListener);
   var watcher = newWatcher(path, observer);

   observer.watcher = watcher;

   return observer;
};

export function removeObserver(observer) {
   observers.invalidateObserver(observer);
};

function newWatcher(path, observer) {
   const watcher = watch(path, {recursive: false});

   watcher.on('change', (event, path) => {
      if (event === 'update') {
         getStats(path).then(observer.onChange);
      } else if (event === 'remove') {
         observer.onRemove(path);
      }
   });

   watcher.on('error', (event, path) => {
      errorHandler({
         event,
         path
      });
   });
}

function getStats(path) {
   return new Promise((resolve, reject) => {
      fs.lstat(path, (err, stats) => {
         if (err) errorHandler(err);

         resolve({
            path,
            directory: stats.isDirectory(),
            birthtime: stats.birthtime,
            modified: stats.mtime
         });
      });
   });
}
