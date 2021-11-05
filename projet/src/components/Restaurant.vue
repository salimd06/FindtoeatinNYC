<template>

<div>
<section class="barMenu">
        <md-menu md-size="small">
          <md-button md-menu-trigger>Master 1 MIAGE</md-button>
        </md-menu>

        <md-menu md-size="medium">
          <md-button md-menu-trigger>7'O Restaurant</md-button>
        </md-menu>

        <md-menu md-size="big">
          <md-button md-menu-trigger>restaurant</md-button>
        </md-menu>

      </section>
  <div class="vuegeneral">
  
    <div class="info" style ="margin-top : 5%; margin-left : 2%; border : outset;">
 
        <h2 class="titrerestau"> {{restaurant.name}} </h2>
       
        <p><md-icon>room</md-icon> Situé à  {{restaurant.address.street}},{{restaurant.borough}}  {{restaurant.address.zipcode}}
        </p>
        <Imageres/>
        <md-field>Note du restaurant :</md-field> <h2 style= "font-family: cursive;">{{restaurant.grades[0].grade}}</h2>
    </div>
    
    
  <div class="carte" style = "margin-top : 4%; margin-right : 4%;">
     <Map ref="map"/>
  </div>
  </div></div>
  
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
   background-color : grey;
}
.carte{
  width:50%;
  margin-left:450px;
}
.titrerestau{
  display: flex; 
  justify-content: center; 
   align-items: center;
   font-style : oblique;
}
.info{
   
   justify-content: center; 
   align-items: center;
}
.note{
  width : 40%;
  
}
  

</style>