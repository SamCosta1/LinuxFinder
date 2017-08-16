<template>
   <div class="directory">
      <div class="listItem" v-for="file in sortedFiles" @click="onClick(file)">
         <p>{{ file.path.trim() }} </p>

      </div>

   </div>
</template>

<script>
   import * as watcher from '../fileSystem/file-watcher.js';
   export default {

      props: ['dir'],
      data() {
         return {
            fileObserver: null,
            rawFilesList: []
         };
      },

      computed: {
         sortedFiles() {
            return this.rawFilesList;
         }
      },

      mounted() {
         this.fileObserver = watcher.addObserver(this.dir, this.onChange, this.onRemove);
         watcher.getInitialDirectoryContent(this.fileObserver, this.onInitialDataReceived);
      },

      beforeDestroy() {
         watcher.removeObserver(this.fileObserver);
      },

      methods: {
         onChange(data) {
            console.log(data.modified);
            for (var i = 0; i < this.rawFilesList.length; i++) {
               if (this.rawFilesList[i].path === data.path) {
                  this.$set(this.rawFilesList, i, data);
                  return;
               }
            }

            // If not found it must be new
            this.rawFilesList.push(data);
         },

         onRemove(path) {
            for (var i = 0; i < this.rawFilesList.length; i++) {
               if (this.rawFilesList[i].path === path) {
                  this.rawFilesList.splice(i, 1);
                  break;
               }
            }
         },

         onClick(file) {
            if (file.isDirectory) {
               this.$emit('addDir', file.path);
            }
         },

         onInitialDataReceived(data) {
            this.rawFilesList = data;
         }
      }
   };
</script>

<style lang="scss">
.listItem {
   width: 300px;
}

</style>
