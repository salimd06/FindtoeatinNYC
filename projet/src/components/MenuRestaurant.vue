<template>
  <div class="globalmenu">
      <h3> Menu du jour </h3>
    <p> {{entree}} </p>
    <p> {{plat}} </p>
    <p> {{dessert}} </p>
  </div>
</template>

<script>
export default {
  name: "MenuRestaurant",
  data: function () {
    return {
      entree: 'oui',
      plat: 'yes',
      dessert:'claro'
    };
    
  },
  props: {
      
    },
  mounted(){

  },
  methods:{
      GenerateMenu(){
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
small {
  display: block;
}
</style>
