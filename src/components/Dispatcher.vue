<template>
  <v-container>
    <v-layout align-center wrap>
      <v-flex xs12 sm6>
        <v-select
          v-model="selectedCustomers"
          :items="customers"
          item-text="name"
          item-value="details"
          attach
          chips
          label="Customers"
          multiple
        ></v-select>

        <v-select
          v-model="selectedTrailer"
          :items="trailers"
          item-text="name"
          item-value="capacity"
          label="Trailers"
        ></v-select>
      </v-flex>
    </v-layout>

    <GmapMap
      :center="cities.Berlin"
      :zoom="10"
      map-type-id="terrain"
      style="width: 90vw; height: 500px"
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />-->
    </GmapMap>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedCustomers: [],
      selectedTrailer: {},
      cities: {
        Cottbus: { lat: 51.75631, lng: 14.332868 },
        Freiburg: { lat: 47.997791, lng: 7.842609 },
        Oranienburg: { lat: 52.753727, lng: 13.236681 },
        Grimma: { lat: 51.236443, lng: 12.720231 },
        Tübingen: { lat: 48.521637, lng: 9.057645 },
        Mainz: { lat: 49.992863, lng: 8.247253 },
        Münster: { lat: 51.961563, lng: 7.628202 },
        Cologne: { lat: 50.933594, lng: 6.961899 },
        Dresden: { lat: 51.050407, lng: 13.737262 },
        Kassel: { lat: 51.312801, lng: 9.481544 },
        Berlin: { lat: 52.520008, lng: 13.404954 }
      },
      trailers: [
        { name: "Müller", capacity: 100 },
        { name: "Schmidt", capacity: 150 },
        { name: "Schneider", capacity: 150 },
        { name: "Fischer", capacity: 100 },
        { name: "Weber", capacity: 200 }
      ],
      customers: [
        {
          name: "Emma",
          details: { capacity: 50, from: "Cottbus", to: "Berlin" }
        },
        {
          name: "Hannah",
          details: { capacity: 70, from: "Münster", to: "Mainz" }
        },
        {
          name: "Ben",
          details: { capacity: 120, from: "Tübingen", to: "Mainz" }
        },
        {
          name: "Louis",
          details: { capacity: 30, from: "Grimma", to: "Cologne" }
        },
        {
          name: "Sofia",
          details: { capacity: 200, from: "Berlin", to: "Münster" }
        }
      ]
    };
  }
};
</script>

<style></style>
