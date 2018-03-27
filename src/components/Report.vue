<template>
    <section class="section">
    <form id="form" v-on:submit.prevent="postResult">
        <h1 class="title">Division</h1>
        <b-select v-model="selecteddiv" class="select-top" size="is-medium" expanded>
            <option value="">Välj division...</option>
            <option
                v-for="division in divisions"
                :value="division"
                :key="division.id">
                {{ division.divname }}
            </option>
        </b-select>

        <div v-if="selecteddiv !== ''">
            <hr class="hr-first" />
            <h1 class="title">Match</h1>
            <b-select v-model="selectedmatch" class="select-top" expanded>
                <option value="">Välj match...</option>
                <option
                    v-for="match in selecteddiv.matches"
                    :value="match"
                    :key="match.id">
                    {{ match.matchnumber }}: {{ selecteddiv.teams[match.hometeam].name }} - {{ selecteddiv.teams[match.awayteam].name }}
                </option>
            </b-select>
        </div>

        <div v-if="selectedmatch !== ''">
            <hr class="hr-first" />

            <div class="title is-4">Dubbel</div>

            <player-name-input 
                v-model="doublesplayer1home" 
                v-bind:players="selecteddiv.teams[selectedmatch.hometeam].members"
                label="Hemmaspelare 1"
                id="doublesplayer1home"
            ></player-name-input>

            <player-name-input 
                v-model="doublesplayer2home" 
                v-bind:players="selecteddiv.teams[selectedmatch.hometeam].members"
                label="Hemmaspelare 2"
                id="doublesplayer2home"
            ></player-name-input>

            <player-name-input 
                v-model="doublesplayer1away" 
                v-bind:players="selecteddiv.teams[selectedmatch.awayteam].members"
                label="Bortaspelare 1"
                id="doublesplayer1away"
            ></player-name-input>

            <player-name-input 
                v-model="doublesplayer2away" 
                v-bind:players="selecteddiv.teams[selectedmatch.awayteam].members"
                label="Bortaspelare 2"
                id="doublesplayer2away"
            ></player-name-input>

            <label class="label">Resultat</label>

            <div class="columns">
                <div class="column">
                    <b-input type="tel" name="doublesset1" placeholder="Set 1" v-model="doublesset1">
                    </b-input>
                </div>
                <div class="column">
                    <b-input type="tel"
                        name="doublesset2"
                        placeholder="Set 2"
                        v-model="doublesset2"
                        pattern="[0-9][0-9]?-[0-9][0-9]?"
                        title="Resultat för set 2">
                    </b-input>
                </div>
                <div class="column">
                    <b-input type="tel" name="doublesset3" placeholder="Set 3" v-model="doublesset3">
                    </b-input>
                </div>
            </div>

            <hr />

            <div class="title is-4">Singel 1</div>
            <player-name-input 
                v-model="singlesplayer1home" 
                v-bind:players="selecteddiv.teams[selectedmatch.hometeam].members"
                label="Hemmaspelare"
                id="singlesplayer1home"
            ></player-name-input>

            <player-name-input 
                v-model="singlesplayer1away" 
                v-bind:players="selecteddiv.teams[selectedmatch.awayteam].members"
                label="Bortaspelare"
                id="singlesplayer1away"
            ></player-name-input>

            <label class="label">Resultat</label>

            <div class="columns">
                <div class="column">
                    <b-input type="tel" name="singles1set1" placeholder="Set 1" v-model="singles1set1">
                    </b-input>
                </div>
                <div class="column">
                    <b-input type="tel" name="singles1set2" placeholder="Set 2" v-model="singles1set2">
                    </b-input>
                </div>
                <div class="column">
                    <b-input type="tel" name="singles1set3" placeholder="Set 3" v-model="singles1set3">
                    </b-input>
                </div>
            </div>

            <hr />

            <div class="title is-4">Singel 2</div>
            <player-name-input 
                v-model="singlesplayer2home" 
                v-bind:players="selecteddiv.teams[selectedmatch.hometeam].members"
                label="Hemmaspelare"
                id="singlesplayer2home"
            ></player-name-input>

            <player-name-input 
                v-model="singlesplayer2away" 
                v-bind:players="selecteddiv.teams[selectedmatch.awayteam].members"
                label="Bortaspelare"
                id="singlesplayer2away"
            ></player-name-input>

            <label class="label">Resultat</label>

            <div class="columns">
                <div class="column">
                    <b-input type="tel" name="singles2set1" placeholder="Set 1" v-model="singles2set1">
                    </b-input>
                </div>
                <div class="column">
                    <b-input type="tel" name="singles2set2" placeholder="Set 2" v-model="singles2set2">
                    </b-input>
                </div>
                <div class="column">
                    <b-input type="tel" name="singles2set3" placeholder="Set 3" v-model="singles2set3">
                    </b-input>
                </div>
            </div>

            <hr />

            <div class="title is-4">Matchresultat</div>
            <b-input type="tel" name="matchresult" placeholder="Ange totalt resultat" v-model="matchresult">
            </b-input>

            <button type="submit" class="button is-medium is-primary button-submit">Skicka in</button>
        </div>
    </form>
    </section>
</template>

<script>
import firebase from 'firebase'
import PlayerNameInput from '@/components/PlayerNameInput'

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
  name: 'Report',
  data: function() {
    return {
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
  },
  components: {
      PlayerNameInput
  }
}
</script>

<style lang="scss">

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

.select-top select {
  padding-left: 5px;
  height: 40px;
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-radius: unset;
  font-weight: 600;
}

.select-top select:focus {
  outline: none;
  box-shadow: none;
}

</style>
