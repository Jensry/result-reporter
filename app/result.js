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

firebase.database.enableLogging(function(message) {
  console.log("[FIREBASE]", message);
});

var divisionsRef = firebase.database().ref('divisions');
var resultsRef = firebase.database().ref('results');

var app = new Vue({
  el: '#app',
  data: {
    selecteddiv: '',
    selectedmatch: '',
    doublesplayer1home: '',
    doublesplayer2home: '',
    doublesplayer1away: '',
    doublesplayer2away: '',
    doublesset1: '',
    doublesset2: '',
    doublesset3: '',
    singlesplayer1home: '',
    singlesplayer1away: '',
    singles1set1: '',
    singles1set2: '',
    singles1set3: '',
    singlesplayer2home: '',
    singlesplayer2away: '',
    singles2set1: '',
    singles2set2: '',
    singles2set3: '',
    matchresult: ''
  },
  firebase: {
    divisions: divisionsRef
  },
  methods: {
    postResult: function () {
      resultsRef.push({
        'timestamp': firebase.database.ServerValue.TIMESTAMP,
        'division': this.selecteddiv.divid,
        'matchId': this.selectedmatch.matchid,
        'doublesPlayerHome1': this.doublesplayer1home,
        'doublesPlayerHome2': this.doublesplayer2home,
        'doublesPlayerAway1': this.doublesplayer1away,
        'doublesPlayerAway2': this.doublesplayer2away,
        'doublesSet1': this.doublesset1,
        'doublesSet2': this.doublesset2,
        'doublesSet3': this.doublesset3,
        'singlesPlayer1Home': this.singlesplayer1home,
        'singlesPlayer1Away': this.singlesplayer1away,
        'singles1Set1': this.singles1set1,
        'singles1Set2': this.singles1set2,
        'singles1Set3': this.singles1set3,
        'singlesPlayer2Home': this.singlesplayer2home,
        'singlesPlayer2Away': this.singlesplayer2away,
        'singles2Set1': this.singles2set1,
        'singles2Set2': this.singles2set2,
        'singles2Set3': this.singles2set3,
        'matchResult': this.matchresult
      });
    }
  }
})