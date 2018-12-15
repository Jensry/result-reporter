<template>
  <section id="app" class="section">
    <div class="container main">
      <img class="container logo" src="./assets/bkc-logo.jpg">
      <router-view/>
    </div>
  </section>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "assets/bkc-styles";

html {
  height: 100%;
}
body {
  min-height: 100%;
}

body {
  background-color: #f0f2f1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo {
  border-radius: 7px 7px 0 0;
}

#app .container.main {
  border-radius: 7px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.section {
  padding-top: 1.5em;
}
</style>
