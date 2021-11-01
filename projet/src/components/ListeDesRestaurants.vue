<template> 
  <div class="global">
    <div class="menu">
      <h2>{{ msg }}</h2>
      <form class="ajouter" v-on:submit.prevent="ajouterRestaurant(event)">
        <md-card class="mdcardajout">
          <md-card-header>
            <div class="md-title">Ajout de restaurant</div>
          </md-card-header>

          <md-field>
            <label> Nom : </label>
            <md-input name="name" type="text" required v-model="nom" />
          </md-field>
          <md-field>
            <label> Cuisine : </label
            ><md-input name="cuisine" type="text" required v-model="cuisine" />
          </md-field>

          <md-button>Ajouter</md-button>
        </md-card>
      </form>
      <form class="recherche">
        <md-card class="mdcartrecherche">
          <md-card-header>
            <div class="md-title">Paramètre de recherche</div>
          </md-card-header>
          <md-field>
            <label> Chercher par nom :</label>
            <md-input
              @input="chercherRestaurants"
              type="texte"
              required
              v-model="nomRestauRecherche"
            />
          </md-field>
          <p>
            Nb restaurants par page
            <input
              @input="getRestaurantsFromServeur()"
              type="range"
              min="2"
              max="100"
              value="10"
              v-model="pagesize"
            />{{ pagesize }}
          </p>
        </md-card>
        <md-card class="mdinfo">
          <md-card-header>
            <div class="md-title">Information</div>
          </md-card-header>
          <p>Nombre de restaurants : {{ nbRestaurantsTotal }}</p>

          <p>Nb de pages total : {{ nbPagesTotal }}</p>
        </md-card>
      </form>
    </div>
    <div class="lesrestaurant">
      <div class="suivantprec">
        <md-button
          class="md-raised"
          :disable="page === 0"
          @click="pagePrecedente()"
          >Précédent</md-button
        >&nbsp;&nbsp;
        <md-button
          class="md-raised"
          :disable="page === nbPagesTotal"
          @click="pageSuivante()"
        >
          Suivant
        </md-button>
      </div>
      <md-table v-model="restaurants">
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item, index }"
          :style="{ backgroundColor: getColor(index) }"
          :class="{ bordureRouge: index === 2 }"
        >
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
            item.cuisine
          }}</md-table-cell>
          <md-table-cell md-label="Ville" md-sort-by="ville"
            >{{ item.borough }}
          </md-table-cell>
          <md-table-cell md-label="Action" class="DetailRestau" tag="li"
            ><b-button pill variant="outline-secondary"
              ><router-link :to="'/restaurant/' + item._id" class="active"
                >Detail d'un restaurant</router-link
              ></b-button
            ></md-table-cell
          >
        </md-table-row>
      </md-table>
      <md-dialog-alert
        :md-active="AucunRestaurant"
        @click="RechercheA0()"
        md-title="Erreur"
        md-content="Le restaurant recherché n'existe pas"
      />
    </div>
  </div>
</template>

<style>


.md-table {
  width: 1100px;
  margin-left: 80px;
  background-color: grey;
}

.md-table-cell{
  width:29%;
  
}

.routerlink {
  display: block;
  color: rgb(139, 92, 92);
}

nav li:hover,
nav li:active {
  background-color: indianred;
  cursor: pointer;
}

.suivantprec {
  margin-left: 520px;
  margin-top: 12%;
}

.menu {
  margin-left: 50px;
  margin-top: 10%;
  width: 30%;
  height: 500px;
}

.md-field {
  width: 80%;
}

.mdcardajout {
  padding-left: 10%;
}

.mdcartrecherche {
  margin-top: 10%;
  padding-bottom: 1%;
  padding-left: 10%;
}

.mdinfo {
  padding-left: 10%;
  padding-bottom: 5%;
}

.global {
  display: flex;
  align-items: left;
  justify-content: left;

}

h1 {
  background-color: yellow;
}

.ajouter {
  justify-content: center;
  width: 100%;
  display: inline-block;
  height: 200px;
}

.recherche {
  justify-content: center;
  height: 200px;
}


</style>

<script>
import _ from "lodash";

export default {
  name: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      event: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
      AucunRestaurant: false,
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServeur();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServeur();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServeur();
    },
    getRestaurantsFromServeur() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.AucunRestaurant = false;
            if (this.nbRestaurantsTotal === 0) {
              this.AucunRestaurant = true;
            }
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    chercherRestaurants: _.debounce(function () {
      this.getRestaurantsFromServeur();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServeur();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServeur();
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
    RechercheA0() {
      this.AucunRestaurant = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

