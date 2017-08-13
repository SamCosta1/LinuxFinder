exports.newInstance = () => {
   return {
      listeners: [],
      notify(data) {
         for (let listener of this.listeners) {
            listener(data);
         }
      }
   };
};
