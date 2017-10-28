// Initialize Firebase
var config = {
    apiKey: "AIzaSyBryZbERP8kfcf6NPbEPzyEk5ahWzkbQtE",
    authDomain: "motionsserien-3a987.firebaseapp.com",
    databaseURL: "https://motionsserien-3a987.firebaseio.com",
    projectId: "motionsserien-3a987",
    storageBucket: "motionsserien-3a987.appspot.com",
    messagingSenderId: "707867925001"
  };
  firebase.initializeApp(config);

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    selecteddiv: '',
    selectedmatch: ''
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    divisions: firebase.database().ref('divisions')
  }
})