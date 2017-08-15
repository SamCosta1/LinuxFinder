<template>
   <div class="sidebar">
      <div v-for="dir in config" @click="onClick(dir.path)">
         {{dir.string}}
      </div>
   </div>
</template>

<script>
   import * as store from '../helpers/sidebar-store-helper';

   export default {
      name: 'finder',
      data() {
         return {
            config: {}
         };
      },
      methods: {
         onClick(path) {
            this.$emit('changeRootDir', path);
         }
      },

      mounted() {
         this.config = store.getConfig();
      }
   };
</script>

<style lang="scss">


</style>
