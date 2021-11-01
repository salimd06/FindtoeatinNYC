<template>


  <div class="hello">

      
        <h1>Détail du restaurant qui a pour id : {{id}} </h1>

        <li> Nom :  {{restaurant.name}} </li>
       
       <li> Ville :  {{restaurant.borough}} </li>
  <Map ref="map"/>
  </div>
</template>

<script>
import Map from './Map.vue'

export default {
  name: 'Restaurant',
  components: {
      Map,
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
          //console.log(data.restaurant.name)
          this.restaurant = data.restaurant;
         // console.log(this.restaurant.address.coord);
       /*   this.$refs.mymap.center= this.restaurant.address.coord;
          console.log("ref = ")
          console.log(this.$refs.mymap.center)*/
          console.log(this.restaurant.address.coord)
        //this.$refs.map. = this.restaurant.address.coord
        this.$nextTick(function(){
          this.MAJCenter(this.restaurant.address.coord) 
            //console.log(this.$refs.map.center)
          });
          
      })
      
     // this.Map.methods.centerUpdated(this.restaurant.address.coord)
      
       //console.log(this.$refs.mapRef.center)
  },
  methods:{
    MAJCenter(center){
      var tmp = center[1]
      center[1]=center[0]
      center[0] = tmp;
        this.$refs.map.centerUpdated(center) 
        this.$refs.map.Setmarker(center)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
