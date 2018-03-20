<template>
    <form class="container main-form" id="form" novalidate v-on:submit.prevent="postResult">
        <h2>Division</h2>
        <div>
            <select class="form-control input-lg select-top" v-model="selecteddiv" id="division">
                <option value="">Välj division...</option>
                <option v-for="division in divisions" v-bind:value="division" v-bind:key="division.id">
                    {{ division.divname }}
                </option>
            </select>
        </div>

        <div v-if="selecteddiv !== ''">
            <hr class="hr-first" />
            <h2>Match</h2>
            <div>
                <select class="form-control input-lg select-top" v-model="selectedmatch" id="match">
                    <option value="">Välj match...</option>
                    <option v-for="match in selecteddiv.matches" v-bind:value="match" v-bind:key="match.id">
                        {{ match.matchnumber }}: {{ selecteddiv.teams[match.hometeam].name }} - {{ selecteddiv.teams[match.awayteam].name }}
                    </option>
                </select>
            </div>
        </div>

        <div v-if="selectedmatch !== ''">
            <hr class="hr-first" />

            <legend>Dubbel</legend>

            <div class="form-group">
                <label for="doublesplayer1home">Hemmaspelare 1</label>
                <select class="form-control" id="doublesplayer1home" v-model="doublesplayer1home">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.hometeam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="doublesplayer2home">Hemmaspelare 2</label>
                <select class="form-control" id="doublesplayer2home" v-model="doublesplayer2home">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.hometeam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="doublesplayer1away">Bortaspelare 1</label>
                <select class="form-control" id="doublesplayer1away" v-model="doublesplayer1away">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.awayteam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="doublesplayer2away">Bortaspelare 2</label>
                <select class="form-control" id="doublesplayer2away" v-model="doublesplayer2away">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.awayteam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>

            <div class="row">
                <div class="col-sm-9 col-md-6">
                    <label>Resultat</label>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" name="doublesset1" placeholder="Set 1" v-model="doublesset1" v-validate="{ required: true, regex: /^([0-9][0-9]?-[0-9][0-9]?)$/ }">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" name="doublesset2" placeholder="Set 2" v-model="doublesset2">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" name="doublesset3" placeholder="Set 3" v-model="doublesset3">
                </div>
            </div>

            <hr />


            <legend>Singel 1</legend>
            <div class="form-group">
                <label for="singlesplayer1home">Hemmaspelare</label>
                <select class="form-control" id="singlesplayer1home" v-model="singlesplayer1home">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.hometeam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="singlesplayer1away">Bortaspelare</label>
                <select class="form-control" id="singlesplayer1away" v-model="singlesplayer1away">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.awayteam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>

            <div class="row">
                <div class="col-sm-9 col-md-6">
                    <label>Resultat</label>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" id="singles1set1" placeholder="Set 1" v-model="singles1set1">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" id="singles1set2" placeholder="Set 2" v-model="singles1set2">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" id="singles1set3" placeholder="Set 3" v-model="singles1set3">
                </div>
            </div>

            <hr />

            <legend>Singel 2</legend>
            <div class="form-group">
                <label for="singlesplayer2home">Hemmaspelare</label>
                <select class="form-control" id="singlesplayer2home" v-model="singlesplayer2home">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.hometeam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="singlesplayer2away">Bortaspelare</label>
                <select class="form-control" id="singlesplayer2away" v-model="singlesplayer2away">
                    <option value="">Välj spelare...</option>
                    <option v-for="member in selecteddiv.teams[selectedmatch.awayteam].members" v-bind:key="member.id">
                        {{ member }}
                    </option>
                </select>
            </div>

            <div class="row">
                <div class="col-sm-9 col-md-6">
                    <label>Resultat</label>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" id="singles2set1" placeholder="Set 1" v-model="singles2set1">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" id="singles2set2" placeholder="Set 2" v-model="singles2set2">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-2 form-group">
                    <input type="tel" class="form-control" id="singles2set3" placeholder="Set 3" v-model="singles2set3">
                </div>
            </div>

            <hr />

            <legend>Matchresultat</legend>
            <div class="form-group">
                <input type="tel" class="form-control" id="matchresult" v-model="matchresult" placeholder="Ange totalt resultat">
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-block button-submit">Skicka in</button>
        </div>
    </form>
</template>

<script>
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBryZbERP8kfcf6NPbEPzyEk5ahWzkbQtE",
  authDomain: "motionsserien-3a987.firebaseapp.com",
  databaseURL: "https://motionsserien-3a987.firebaseio.com",
  projectId: "motionsserien-3a987",
  storageBucket: "motionsserien-3a987.appspot.com",
  messagingSenderId: "707867925001"
};
let app = firebase.initializeApp(config);
let db = app.database();

firebase.database.enableLogging(function(message) {
  console.log("[FIREBASE]", message);
});

var divisionsRef = db.ref('divisions');
var resultsRef = db.ref('results');

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      //divisions: firebase.database().ref('divisions'),
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
    }
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.button-submit {
  margin-top: 30px;
  margin-bottom: 30px;
}

hr {
  margin-top: 10px;
}

.hr-first {
  margin-top: 0;
}

select.select-top {
  padding: 6px 0px;
  height: 40px;
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-radius: unset;
  font-weight: 600;
}

select.select-top:focus {
  outline: none;
  box-shadow: none;
}

</style>
