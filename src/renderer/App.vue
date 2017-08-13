<template>
   <div id="app">
      Hello world
   </div>
</template>

<script>
   import * as files from './fileSystem/files';
   
   export default {
      name: 'finder',
      data() {
         return {

         };
      },
      methods: {
         change(data) {
            console.log(data);
         },
         error(err) {
            console.log(err);
         }
      }
   };
</script>

<style>
</style>
