<template>

       <img :src="image" />


</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
    <script src="https://unpkg.com/vue@next"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
export default {
  name: "ImageRes",
  data () {
    return {
      api: "https://pixabay.com/api/?key=23678711-ad483ad31080e6c379cf02bff&q=restaurant",
      image: null,
      loading: false,
    };
  },

  mounted() {
  // this.api+=this.typecuisine
 
  this.getImages();
    
  },
  methods: {
  getImages() {
    
   // If key has value then store it to query otherwise store an empty string
   
   // Sets loading value to true
   this.loading = true;
   // Making request to the REST API
    // api + "&q=restaurant";
        fetch(this.api)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
           let indice = Math.floor(Math.random() * 20) // On affiche aléatoirement l'une des 20 premières images
            // Maintenant res est un vrai objet JavaScript
            this.image = resJS.hits[indice].webformatURL;
           
          });
        })


    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
