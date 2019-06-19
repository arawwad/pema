<template>
  <v-container>
    <v-layout align-center wrap>
      <v-form ref="form" v-model="formValid" lazy-validation>
        <v-select
          v-model="selectedCustomers"
          :items="customers"
          item-text="name"
          attach
          chips
          label="Customers"
          multiple
          box
          required
          :rules="[v => !!v || 'Please select an option']"
          return-object
        ></v-select>

        <p class="mb-2">Current Total Capacity: {{ currentTotalCapacity }}</p>

        <v-select
          v-model="selectedTrailer"
          :items="trailers"
          :item-disabled="checkCapacity"
          item-text="name"
          label="Trailers"
          box
          required
          :rules="[v => !!v || 'Please select an option']"
          return-object
        ></v-select>
        <v-btn :disabled="!formValid" color="success" @click="dispatch"
          >Dispatch</v-btn
        >
      </v-form>
    </v-layout>

    <GmapMap
      ref="map"
      :center="cities.Berlin"
      :zoom="5"
      map-type-id="terrain"
      style="width: 900px; height: 500px; margin-top: 50px"
    >
      <GmapMarker
        :key="`dropOff-${index}`"
        v-for="(marker, index) in dropOffs"
        :position="marker"
        :clickable="false"
        :draggable="false"
        :icon="{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }"
      />
      <GmapMarker
        :key="`pickup-${index}`"
        v-for="(marker, index) in pickups"
        :position="marker"
        :clickable="false"
        :draggable="false"
        :icon="{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }"
      />
    </GmapMap>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formValid: true,
      selectedCustomers: null,
      selectedTrailer: null,
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
        { name: "Fischer", capacity: 100 },
        { name: "Weber", capacity: 200 },
        { name: "Müller", capacity: 100 },
        { name: "Schmidt", capacity: 150 },
        { name: "Schneider", capacity: 150 }
      ],
      customers: [
        {
          name: "Emma",
          capacity: 50,
          from: "Cottbus",
          to: "Berlin"
        },
        {
          name: "Hannah",
          capacity: 70,
          from: "Münster",
          to: "Mainz"
        },
        {
          name: "Ben",
          capacity: 120,
          from: "Tübingen",
          to: "Mainz"
        },
        {
          name: "Louis",
          capacity: 30,
          from: "Grimma",
          to: "Cologne"
        },
        {
          name: "Sofia",
          capacity: 200,
          from: "Berlin",
          to: "Münster"
        }
      ],
      pickups: [],
      dropOffs: []
    };
  },
  computed: {
    currentTotalCapacity() {
      if (this.selectedCustomers === null) return 0;
      return this.selectedCustomers.reduce((acc, curr) => {
        return acc + curr.capacity;
      }, 0);
    },
    randomIndex() {
      return Math.random();
    }
  },
  methods: {
    checkCapacity(val) {
      if (val.capacity < this.currentTotalCapacity) {
        return true;
      } else {
        return false;
      }
    },
    dispatch() {
      if (this.$refs.form.validate()) {
        this.getRoute();
      }
    },
    getRoute() {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setOptions({ suppressMarkers: true });
      this.directionsDisplay.setMap(this.$refs.map.$mapObject);
      const vm = this;
      const waypoints = [];
      //   this.pickups.forEach((pickup, index) => {
      //     if (index === 0) return;
      //     this.waypoints.push(pickup);
      //     this.waypoints.push(this.dropOffs[index]);
      //   });
      vm.directionsService.route(
        {
          origin: this.pickups[0],
          destination: this.dropOffs[0],
          travelMode: "DRIVING",
          waypoints
        },
        (response, status) => {
          if (status === "OK") {
            vm.directionsDisplay.setDirections(response);
          } else {
            console.log(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  },
  watch: {
    currentTotalCapacity(currentTotal) {
      if (this.selectedTrailer === null) return;
      if (currentTotal > this.selectedTrailer.capacity) {
        this.selectedTrailer = null;
      }
    },
    selectedCustomers(val) {
      this.pickups = val.map(customer => {
        return this.cities[customer.from];
      });
      this.dropOffs = val.map(customer => {
        return this.cities[customer.to];
      });
    }
  }
};
</script>

<style></style>
