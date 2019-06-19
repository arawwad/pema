<template>
  <v-app>
    <v-container>
      <h1>Dispatching a Trailer</h1>
      <dispatcher />
    </v-container>
  </v-app>
</template>

<script>
import Dispatcher from "./components/Dispatcher";

export default {
  name: "App",
  components: {
    Dispatcher
  },
  data() {
    return {
      //
    };
  }
};
</script>
