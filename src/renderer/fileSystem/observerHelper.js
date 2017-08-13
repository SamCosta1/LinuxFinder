
export function newObserver(path, changeListener, removeListener) {
   return {
      path,
      changeListener,
      removeListener,

      onChange(data) {
         changeListener(data);
      },
      onRemove(path) {
         removeListener(path);
      }
   };
}

export function invalidateObserver(observer) {
   observer.watcher.close();
}
