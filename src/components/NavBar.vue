<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">

      
<router-link to="/" tag="b-navbar-brand">Reguleque</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
<!-- Left aligned nav items -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
           <router-link to="/" tag="b-nav-item">Inicio</router-link>
          <router-link to="/colaborar" tag="b-nav-item">Colaborar</router-link>
          <router-link to="/donar" tag="b-nav-item">Donar</router-link>          
          <router-link to="/creditos" tag="b-nav-item">Créditos</router-link>          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
