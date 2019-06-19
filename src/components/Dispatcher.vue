<template>
  <v-container>
    <h1>Hello</h1>

    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cities: []
    };
  }
};
</script>

<style></style>
