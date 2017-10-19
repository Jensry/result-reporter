var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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


var teamsRef = firebase.database().ref('teams')
var matchesRef = firebase.database().ref('matches')

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    newUser: {
      name: '',
      email: ''
    }
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    teams: teamsRef,
    matches: matchesRef
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
    addUser: function () {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.name = ''
        this.newUser.email = ''
      }
    },
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    }
  }
})