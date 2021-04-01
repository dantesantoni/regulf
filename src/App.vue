<template>
  <div id="app">
<NavBar />
    <router-view />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",

  components: {
     NavBar,
  },

  data: () => ({
    //
    //apiurl : 'http://localhost:8081/mtobridge/api/'
  })
};
</script>
