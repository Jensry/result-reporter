import firebase from "firebase/app";
import "firebase/database";
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueFire from "vuefire";
import Buefy from "buefy";

Vue.config.productionTip = false;

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBryZbERP8kfcf6NPbEPzyEk5ahWzkbQtE",
  authDomain: "motionsserien-3a987.firebaseapp.com",
  databaseURL: "https://motionsserien-3a987.firebaseio.com",
  projectId: "motionsserien-3a987",
  storageBucket: "motionsserien-3a987.appspot.com",
  messagingSenderId: "707867925001"
};
if (process.env.VUE_APP_DEPLOY_TARGET === "bkc") {
  config = {
    apiKey: "AIzaSyBD5x2740Z5MHwfCBwdIm5AWHPcV3fxkSQ",
    authDomain: "bkc-motionsserien.firebaseapp.com",
    databaseURL: "https://bkc-motionsserien.firebaseio.com",
    projectId: "bkc-motionsserien",
    storageBucket: "bkc-motionsserien.appspot.com",
    messagingSenderId: "192628513776"
  };
}
firebase.initializeApp(config);

if (process.env.NODE_ENV === "development") {
  firebase.database.enableLogging(function(message) {
    console.log("[FIREBASE]", message);
  });
}

Vue.use(VueFire);
Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
