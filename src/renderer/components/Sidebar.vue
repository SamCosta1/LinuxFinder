<template>
   <div id="sidebar">
      <div v-for="dir in content">
         {{dir}}
      </div>
   </div>
</template>

<script>
   import * as store from '../helpers/sidebar-store-helper';

   export default {
      name: 'finder',
      data() {
         return {
            content: {}
         };
      },
      methods: {
      },

      mounted() {
         this.content = store.getContent();
      }
   };
</script>

<style>
</style>
