import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import "./plugins/vuetify";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCgPrONYaAFeCYlESi1xGzCbODSZ5FScuE"
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
