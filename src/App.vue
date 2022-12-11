<template>
  <div class="bg">
    <main class="bg">
      <header>
        <Navbar />
      </header>
      <!-- <HomePage /> -->
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bg{
  background: linear-gradient(to right,#000000, #fc65fc);
  font-family: 'Abel', sans-serif;

}
</style>
