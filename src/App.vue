<template>
  <div id="nav">
    <router-link to="/">Listar</router-link> |
    <router-link to="/create">Crear</router-link>
    <!-- <router-link to="/edit">Editar</router-link> -->
  </div>
  <router-view />
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn-group button {
  margin: 0 1rem;
}

.btn-group {
  margin-top: 2rem;
  display: inherit;
  text-align: center;
}
</style>
