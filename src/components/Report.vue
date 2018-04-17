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

            <game-result
                v-model="doublesResult">
            </game-result>

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

            <game-result
                v-model="singles1Result">
            </game-result>

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

            <game-result
                v-model="singles2Result">
            </game-result>

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
import firebase from "firebase";
import PlayerNameInput from "@/components/PlayerNameInput";
import GameResult from "@/components/GameResult";

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

var divisionsRef = db.ref("divisions");
var resultsRef = db.ref("results");

export default {
  name: "Report",
  data: function() {
    return {
      selecteddiv: "",
      selectedmatch: "",
      doublesplayer1home: "",
      doublesplayer2home: "",
      doublesplayer1away: "",
      doublesplayer2away: "",
      doublesResult: {},
      singlesplayer1home: "",
      singlesplayer1away: "",
      singles1Result: {},
      singlesplayer2home: "",
      singlesplayer2away: "",
      singles2Result: {},
      matchresult: ""
    };
  },
  firebase: {
    divisions: divisionsRef
  },
  methods: {
    postResult: function() {
      resultsRef.push({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        division: this.selecteddiv.divid,
        matchId: this.selectedmatch.matchid,
        doublesPlayerHome1: this.doublesplayer1home,
        doublesPlayerHome2: this.doublesplayer2home,
        doublesPlayerAway1: this.doublesplayer1away,
        doublesPlayerAway2: this.doublesplayer2away,
        doublesSet1: this.doublesResult.setOne.home + '-' + this.doublesResult.setOne.away,
        doublesSet2: this.doublesResult.setTwo.home + '-' + this.doublesResult.setTwo.away,
        doublesSet3: this.doublesResult.setThree.home + '-' + this.doublesResult.setThree.away,
        singlesPlayer1Home: this.singlesplayer1home,
        singlesPlayer1Away: this.singlesplayer1away,
        singles1Set1: this.singles1Result.setOne.home + '-' + this.singles1Result.setOne.away,
        singles1Set2: this.singles1Result.setTwo.home + '-' + this.singles1Result.setTwo.away,
        singles1Set3: this.singles1Result.setThree.home + '-' + this.singles1Result.setThree.away,
        singlesPlayer2Home: this.singlesplayer2home,
        singlesPlayer2Away: this.singlesplayer2away,
        singles2Set1: this.singles2Result.setOne.home + '-' + this.singles2Result.setOne.away,
        singles2Set2: this.singles2Result.setTwo.home + '-' + this.singles2Result.setTwo.away,
        singles2Set3: this.singles2Result.setThree.home + '-' + this.singles2Result.setThree.away,
        matchResult: this.matchresult
      });
    }
  },
  components: {
    PlayerNameInput,
    GameResult
  }
};
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

.is-vertical-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
