<template>
   <div class="sidebar">
      <div v-for="dir in config" @click="onClick(dir.path)">
         <p>{{dir.string.trim()}}</p>
      </div>
   </div>
</template>

<script>
   import * as store from '../helpers/sidebar-store-helper';

   export default {
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
         this.$emit('changeRootDir', this.config.default.path);
      }
   };
</script>

<style lang="scss">


</style>
