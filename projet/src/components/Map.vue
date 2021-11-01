<template>
  <l-map style="height: 300px" :zoom="zoom" :center="center" @update:center="centerUpdated"
     @update:markerLatIng="Setmarker">
    
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
  </l-map>
</template>

<script>

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css"

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name:'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      
    }; 
    
  },
  mounted(){
    console.log(this.center);
    
    },
    methods: {
        centerUpdated(center){
            
            this.center = center
            
            console.log(this.center)
        },
        Setmarker(center){
            this.markerLatLng = center;
        }
    }
}
</script>
