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

            <div class="columns is-8 is-variable">
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="doublesset1Home"
                                title="Resultat för set 1"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="doublesset1Away"
                                title="Resultat för set 1"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="doublesset2Home"
                                title="Resultat för set 2"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="doublesset2Away"
                                title="Resultat för set 2"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="doublesset3Home"
                                title="Resultat för set 3"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="doublesset3Away"
                                title="Resultat för set 3"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
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

            <div class="columns is-8 is-variable">
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="singles1set1Home"
                                title="Resultat för set 1"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="singles1set1Away"
                                title="Resultat för set 1"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="singles1set2Home"
                                title="Resultat för set 2"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="singles1set2Away"
                                title="Resultat för set 2"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="singles1set3Home"
                                title="Resultat för set 3"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="singles1set3Away"
                                title="Resultat för set 3"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
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

            <div class="columns is-8 is-variable">
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="singles2set1Home"
                                title="Resultat för set 1"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="singles2set1Away"
                                title="Resultat för set 1"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="singles2set2Home"
                                title="Resultat för set 2"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="singles2set2Away"
                                title="Resultat för set 2"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns is-1 is-variable is-mobile">
                        <div class="column">
                            <set-result 
                                v-model="singles2set3Home"
                                title="Resultat för set 3"
                                placeholder="Hemma"
                            ></set-result>
                        </div>
                        <div class="column is-narrow is-vertical-center">-</div>
                        <div class="column">
                            <set-result 
                                v-model="singles2set3Away"
                                title="Resultat för set 3"
                                placeholder="Borta"
                            ></set-result>
                        </div>
                    </div>
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
import firebase from "firebase";
import PlayerNameInput from "@/components/PlayerNameInput";
import SetResult from "@/components/SetResult";

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
      doublesset1Home: "",
      doublesset2Home: "",
      doublesset3Home: "",
      doublesset1Away: "",
      doublesset2Away: "",
      doublesset3Away: "",
      singlesplayer1home: "",
      singlesplayer1away: "",
      singles1set1Home: "",
      singles1set2Home: "",
      singles1set3Home: "",
      singles1set1Away: "",
      singles1set2Away: "",
      singles1set3Away: "",
      singlesplayer2home: "",
      singlesplayer2away: "",
      singles2set1Home: "",
      singles2set2Home: "",
      singles2set3Home: "",
      singles2set1Away: "",
      singles2set2Away: "",
      singles2set3Away: "",
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
        doublesSet1: this.doublesset1Home + '-' + this.doublesset1Away,
        doublesSet2: this.doublesset2Home + '-' + this.doublesset2Away,
        doublesSet3: this.doublesset3Home + '-' + this.doublesset3Away,
        singlesPlayer1Home: this.singlesplayer1home,
        singlesPlayer1Away: this.singlesplayer1away,
        singles1Set1: this.singles1set1Home + '-' + this.singles1set1Away,
        singles1Set2: this.singles1set2Home + '-' + this.singles1set2Away,
        singles1Set3: this.singles1set3Home + '-' + this.singles1set3Away,
        singlesPlayer2Home: this.singlesplayer2home,
        singlesPlayer2Away: this.singlesplayer2away,
        singles2Set1: this.singles2set1Home + '-' + this.singles2set1Away,
        singles2Set2: this.singles2set2Home + '-' + this.singles2set2Away,
        singles2Set3: this.singles2set3Home + '-' + this.singles2set3Away,
        matchResult: this.matchresult
      });
    }
  },
  components: {
    PlayerNameInput,
    SetResult
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
