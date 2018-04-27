<template>
    <section class="section">
    <form id="form" @submit.prevent="confirm">
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

            <confirm-modal 
                v-if="showConfirm" 
                @cancel="cancel"
                @ok="postResult"
                :homeTeam="selectedmatch.hometeam"
                :awayTeam="selectedmatch.awayteam"
                :doublesResult="doublesResult"
                :singlesOneResult="singles1Result"
                :singlesTwoResult="singles2Result"
            ></confirm-modal>
        </div>
    </form>
    </section>
</template>

<script>
import firebase from "firebase";
import PlayerNameInput from "@/components/PlayerNameInput";
import GameResult from "@/components/GameResult";
import ConfirmModal from '@/components/ConfirmModal';

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
      matchresult: "",
      showConfirm: false
    };
  },
  firebase: {
    divisions: divisionsRef
  },
  methods: {
    postResult() {
      resultsRef.push({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        division: this.selecteddiv.divid,
        matchId: this.selectedmatch.matchid,
        matchNumber: this.selectedmatch.matchnumber,
        doublesPlayerHome1: this.doublesplayer1home,
        doublesPlayerHome2: this.doublesplayer2home,
        doublesPlayerAway1: this.doublesplayer1away,
        doublesPlayerAway2: this.doublesplayer2away,
        doublesSet1Home: Number(this.doublesResult.set1.home),
        doublesSet1Away: Number(this.doublesResult.set1.away),
        doublesSet2Home: Number(this.doublesResult.set2.home),
        doublesSet2Away: Number(this.doublesResult.set2.away),
        doublesSet3Home: Number(this.doublesResult.set3.home),
        doublesSet3Away: Number(this.doublesResult.set3.away),
        singlesPlayer1Home: this.singlesplayer1home,
        singlesPlayer1Away: this.singlesplayer1away,
        singles1Set1Home: Number(this.singles1Result.set1.home),
        singles1Set1Away: Number(this.singles1Result.set1.away),
        singles1Set2Home: Number(this.singles1Result.set2.home),
        singles1Set2Away: Number(this.singles1Result.set2.away),
        singles1Set3Home: Number(this.singles1Result.set3.home),
        singles1Set3Away: Number(this.singles1Result.set3.away),
        singlesPlayer2Home: this.singlesplayer2home,
        singlesPlayer2Away: this.singlesplayer2away,
        singles2Set1Home: Number(this.singles2Result.set1.home),
        singles2Set1Away: Number(this.singles2Result.set1.away),
        singles2Set2Home: Number(this.singles2Result.set2.home),
        singles2Set2Away: Number(this.singles2Result.set2.away),
        singles2Set3Home: Number(this.singles2Result.set3.home),
        singles2Set3Away: Number(this.singles2Result.set3.away),
        matchResult: this.matchresult
      }, () => this.$router.push({ name: 'Confirmation'}));
    },
    confirm() {
        this.showConfirm = true;
    },
    cancel() {
        this.showConfirm = false;
    }
  },
  components: {
    PlayerNameInput,
    GameResult,
    ConfirmModal
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

.button-submit {
  margin-bottom: 0;
}

</style>
