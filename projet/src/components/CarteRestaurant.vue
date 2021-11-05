<template>
  <div class="globalcarte">
    <h2>Carte du restaurant</h2>
    <div class="affichecart">
      
        <h3> Entree </h3> 
        <li v-for="itm in entrees" :key="itm">
          {{ itm }}
        </li>
      
      <br>
      
        <h3>Plats </h3> 
        <li v-for="itm in plats" :key="itm">
          {{ itm }}
        </li>
      <br>
      
        <h3> Desserts </h3> 
        <li v-for="itm in desserts" :key="itm">
          {{ itm }}
        </li>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "CarteRestaurant",
  data: function () {
    return {
      entrees: [
        "salade niçoise",
        "antilles des antilles",
        "el fuego de Madrid",
        "salade cesar",
        "salade de macédoine",
        "un panamera",
        "django de custo",
      ],
      plats: [
        "steak végétarien",
        "dorade",
        "fish and chips",
        "choucroutte",
        "pizza au thon",
      ],
      desserts: [
        "tiramisu",
        "mousse au chocolat",
        "tarte aux pommes",
        "tarte aux daims",
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
small {
  display: block;
}

.affichecart{
  display: block;
}
</style>
