<template>
  <div id="app" v-bind:style="{ backgroundColor: color}">
    <!--<router-link to="/">Accueil</router-link>
    <router-link to="/restaurant">[Détail d'un restaurant]</router-link>
  -->
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: function() {
      return {
          color: '#673AB7'
      }
  }
}
</script>

<style>
#app {
  
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

html, body {
  height: 100%;
  width:100%;
 margin: 0;
  padding: 0;
}

</style>
