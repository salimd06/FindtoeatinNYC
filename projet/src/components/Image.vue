<template>
  <div class="hello">
        <h1>Bienvenu dans HelloWorld : {{msg}} </h1>
  </div>
</template>

<script>
export default {
  name: 'Image',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  small {
    display: block;
  }
</style>
