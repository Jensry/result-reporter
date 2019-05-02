<template>
  <section class="section">
    <h1 class="title">Resultat</h1>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Rapporterat</th>
          <th>Division</th>
          <th>Matchnummer</th>
          <th>Hemmalag</th>
          <th>Bortalag</th>
          <th>Resultat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result['.key']">
          <td>{{ toDateString(result.timestamp) }}</td>
          <td>{{ divisionName(result) }}</td>
          <td>{{ result.matchNumber }}</td>
          <td>{{ homeTeam(result) }}</td>
          <td>{{ awayTeam(result) }}</td>
          <td>{{ matchScore(result) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import ResultService from "@/services/result-service.js";

export default {
  name: "Results",
  data() {
    return {
      isLoading: true
    };
  },
  firebase() {
    return {
      results: {
        source: firebase.database().ref("results"),
        readyCallback() {
          this.isLoading = false;
        }
      },
      divisions: {
        source: firebase.database().ref("divisions"),
        asObject: true
      }
    };
  },
  methods: {
    toDateString(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    divisionName(result) {
      if (this.divisions[result.division]) {
        return this.divisions[result.division].divname;
      }
    },
    homeTeam(result) {
      if (
        this.divisions[result.division] &&
        this.divisions[result.division].matches[result.matchId]
      ) {
        return this.divisions[result.division].matches[result.matchId].hometeam;
      }
    },
    awayTeam(result) {
      if (
        this.divisions[result.division] &&
        this.divisions[result.division].matches[result.matchId]
      ) {
        return this.divisions[result.division].matches[result.matchId].awayteam;
      }
    },
    matchScore(result) {
      return ResultService.matchScore(result);
    }
  }
};
</script>

<style lang="scss">
</style>
