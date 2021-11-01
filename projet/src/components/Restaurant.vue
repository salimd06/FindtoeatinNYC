<template>


  <div class="vuegeneral">
    <div class="info">
 
        <h2 class="titrerestau"> {{restaurant.name}} </h2>
       
        <p> Situé à  {{restaurant.borough}} </p>
    </div>
  <div class="carte">
    <p>localisation : </p>
     <Map ref="map"/>
      <Imageres/>
  </div>


  </div>
</template>



<script>
import Map from './Map.vue'
import Imageres from './ImageRes.vue'

export default {
  name: 'Restaurant',
  components: {
      Map,
      Imageres
  },
  props: {

  },
  computed: {
      id() {
          return this.$route.params.id
      }
  },
  data: function() {
      return {
          restaurant:null,
      }
  },
  mounted(){
      console.log("Avant affichage, on pourra faire un fetch...");
      console.log("ID = " + this.id)
      let url="http://localhost:8080/api/restaurants/" + this.id;
      fetch(url)
      .then(reponse => {
          return reponse.json();
      }).then(data => {
          this.restaurant = data.restaurant;
        this.$nextTick(function(){
          this.MAJCenter(this.restaurant.address.coord) 
          });
      })
  },
  methods:{
    MAJCenter(center){
      var tmp = center[1]
      center[1]=center[0]
      center[0] = tmp;
      this.$refs.map.centerUpdated(center) 
      this.$refs.map.Setmarker(center)
        
    },

  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vuegeneral{
  justify-content: center; 
   align-items: center;
   display: flex; 
}

.carte{
  width:50%;
  margin-left:450px;
}

.titrerestau{
  display: flex; 
  justify-content: center; 
   align-items: center;
}

.info{
   
   justify-content: center; 
   align-items: center;
}
</style>