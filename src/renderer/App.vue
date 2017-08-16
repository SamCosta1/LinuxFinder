<template>
   <div id="app">

      <div class="top-bar-container">

      </div>

      <div class="main-content-container">

         <div class="sidebar-container">
            <Sidebar v-on:changeRootDir="changeRootDirectory"></Sidebar>
         </div>

         <div class="main-browser-container">
            <NavigatorView :rootDir="rootDir"></NavigatorView>
         </div>

      </div>
   </div>
</template>

<script>

   import * as watcher from './fileSystem/file-watcher.js';
   
   export default {
      name: 'finder',
      data() {
         return {
            rootDir: ''
         };
      },
      methods: {
         changeRootDirectory(newPath) {
            this.rootDir = newPath;
         },
         err(e) {
            console.log(e);
         }
      },

      mounted() {
         watcher.setErrorHandler(this.err);
      }
   };
</script>

<style lang="scss">
   @import "./scss/styles";

   body {
      margin: 0px;

      #app {
         height: 100vh;
      }
   }

   .top-bar-container {
      background-color: blue;
   }

   .main-content-container {
      display: flex;
      height: 100%;

      .main-browser-container {
         width: 100%;
      }

      .sidebar-container {

      }
   }

</style>
