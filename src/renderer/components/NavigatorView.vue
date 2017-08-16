<template>
   <div class="navigator">
      <ListDirectory v-on:addDir="addDir" v-for="dir in directories" :dir="dir" :key="dir"></ListDirectory>
   </div>
</template>

<script>
import * as watcher from '../fileSystem/file-watcher.js';
const Path = require('path');

// Returns true if first is deeper than the second, e.g /home/foo/bar is deeper than /home/foo
function isDeeperOrEqual(first, second) {
   console.log('deeper: ', first, second, first.split(Path.sep).length >= second.split(Path.sep).length);
   return first.split(Path.sep).length >= second.split(Path.sep).length;
}

export default {

   props: ['rootDir'],
   data() {
      return {
         directories: []
      };
   },
   watch: {
      rootDir(newRoot) {
         this.directories = [newRoot];
      }
   },

   methods: {
      addDir(path) {
         for (var i = 0; i < this.directories.length; i++) {
            if (isDeeperOrEqual(this.directories[i], path)) {
               this.directories.splice(i--, 1);
            }

            // Ignore clicking a path that's already open
            if (this.directories[i] === path) {
               return;
            }
         }

         this.directories.push(path);
      }
   }

};
</script>

<style lang="scss">

.navigator {
   display: flex;
}
</style>
