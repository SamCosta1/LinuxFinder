'use strict';
import * as observers from './observer-helper';

const watch = require('node-watch');
const fs = require('fs-extra');
const Path = require('path');

var errorHandler;

export function setErrorHandler(handler) {
   errorHandler = handler;
}

export function addObserver(path, changeListener, removeListener) {
   path = Path.resolve(path);
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
         path: Path.resolve(path)
      });
   });

   return watcher;
}

export function getInitialDirectoryContent(observer, callback) {
   var paths = fs.readdirSync(observer.path);

   if (paths === null || paths === undefined || paths.length === 0) {
      return [];
   }

   var promises = [];

   for (var path of paths) {
      const fullPath = Path.join(observer.path, path);
      promises.push(getStats(fullPath));
   }

   Promise.all(promises).then(callback).catch(errorHandler);
}

function getStats(path) {
   return new Promise((resolve, reject) => {
      fs.lstat(path, (err, stats) => {
         if (err) {
            errorHandler(err);
            reject(err);
            return;
         }

         resolve({
            path,
            isDirectory: stats.isDirectory(),
            birthtime: stats.birthtime,
            modifiedtime: stats.mtime
         });
      });
   });
}
