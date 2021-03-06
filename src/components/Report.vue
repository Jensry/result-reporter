<template>
  <section class="section">
    <form id="form" @submit.prevent="confirm">
      <h1 class="title">Division</h1>
      <div 
        class="select select-top is-medium is-fullwidth"
        :class="{ 'is-loading': isLoading }"
      >
        <select v-model="selecteddiv">
          <option value>Välj division...</option>
          <option
            v-for="division in divisions"
            :value="division"
            :key="division.divid"
          >{{ division.divname }}</option>
        </select>
      </div>

      <div v-if="selecteddiv !== ''">
        <hr class="hr-first">
        <h1 class="title">Match</h1>
        <b-select v-model="selectedmatch" class="select-top" expanded>
          <option value>Välj match...</option>
          <option
            v-for="match in selecteddiv.matches"
            :value="match"
            :key="match.matchid"
          >{{ match.matchnumber }}: {{ selecteddiv.teams[match.hometeam].name }} - {{ selecteddiv.teams[match.awayteam].name }}
          </option>
        </b-select>
      </div>

      <div v-if="selectedmatch !== ''">
        <hr class="hr-first">

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

        <game-result v-model="doublesResult"></game-result>

        <hr>

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

        <game-result v-model="singles1Result"></game-result>

        <hr>

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

        <game-result v-model="singles2Result"></game-result>

        <button type="submit" class="button is-medium is-primary button-submit">Skicka in</button>

        <transition name="fade">
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
        </transition>

        <transition name="fade">
          <error-modal
            v-if="showError"
            @ok="showError = false"
          ></error-modal>
        </transition>
      </div>
    </form>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import PlayerNameInput from "@/components/PlayerNameInput";
import GameResult from "@/components/GameResult";
import ConfirmModal from "@/components/ConfirmModal";
import ErrorModal from "@/components/ErrorModal";

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
      showConfirm: false,
      showError: false,
      isLoading: true,
      isPosting: false
    };
  },
  firebase() {
    return {
      divisions: {
        source: firebase.database().ref("divisions"),
        readyCallback() {
          this.isLoading = false;
        }
      }
    };
  },
  watch: {
    selecteddiv() {
      this.selectedmatch = "";
    }
  },
  methods: {
    postResult() {
      if (this.isPosting) {
        return;
      }
      this.isPosting = true;
      var resultsRef = firebase.database().ref("results");
      resultsRef.push(
        {
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
          singles2Set3Away: Number(this.singles2Result.set3.away)
        },
        error => {
          if (error) {
            console.log(error);
            this.showConfirm = false;
            this.showError = true;
            this.isPosting = false;
          } else {
            this.showConfirm = false;
            this.isPosting = false;
            this.$router.push({ name: "Confirmation" });
          }
        }
      );
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
    ConfirmModal,
    ErrorModal
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
  margin-top: 15px;
  margin-bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
