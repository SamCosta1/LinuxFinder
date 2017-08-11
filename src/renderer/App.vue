<template>
   <div id="app" @click="bla()">
      Hello world
   </div>
</template>

<script>
   const files = require('../fileStructureLayer/files.js')
   export default {
      name: 'finder',
      methods: {
         bla () {
            files.files()
         }
      }
   }
</script>

<style>
</style>
