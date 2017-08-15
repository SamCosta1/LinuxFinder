<template>
   <div id="app">

      <div class="top-bar-container">

      </div>

      <div class="main-content-container">

         <div class="sidebar-container">
            <Sidebar v-on:changeRootDir="changeRootDirectory"></Sidebar>
         </div>

         <div class="main-browser-container">
            <NavigatorView></NavigatorView>
         </div>

      </div>
   </div>
</template>

<script>
   
   export default {
      name: 'finder',
      data() {
         return {

         };
      },
      methods: {
         changeRootDirectory(newPath) {
            console.log(newPath);
         }
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
