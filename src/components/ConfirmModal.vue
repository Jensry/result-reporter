<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Skicka in</p>
                <button type="button" class="delete" aria-label="close" @click="$emit('cancel')"></button>
            </header>
            <section class="modal-card-body">
                <div class="has-text-centered">Du rapporterar nu in följande:<br/> 
                <b>{{ homeTeam }} - {{ awayTeam }}</b><br/>
                <b>{{ homeScore }} - {{ awayScore }}</b></div>
            </section>
            <footer class="modal-card-foot">
                <button type="button" class="button" @click="$emit('cancel')">Cancel</button>
                <button type="button" class="button is-primary" @click="$emit('ok')">Ok</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    homeTeam: String,
    awayTeam: String,
    doublesResult: Object,
    singlesOneResult: Object,
    singlesTwoResult: Object
  },
  computed: {
    homeScore() {
      let homeScore = 0;
      if (this.calculateGame(this.doublesResult) > 0) {
        homeScore++;
      }
      if (this.calculateGame(this.singlesOneResult) > 0) {
        homeScore++;
      }
      if (this.calculateGame(this.singlesTwoResult) > 0) {
        homeScore++;
      }
      return homeScore;
    },
    awayScore() {
      let awayScore = 0;
      if (this.calculateGame(this.doublesResult) < 0) {
        awayScore++;
      }
      if (this.calculateGame(this.singlesOneResult) < 0) {
        awayScore++;
      }
      if (this.calculateGame(this.singlesTwoResult) < 0) {
        awayScore++;
      }
      return awayScore;
    }
  },
  methods: {
    calculateGame(game) {
      return (
        this.calculateSet(game.set1) +
        this.calculateSet(game.set2) +
        this.calculateSet(game.set3)
      );
    },
    calculateSet(set) {
      if (Number(set.home) > Number(set.away)) {
        return 1;
      } else if (Number(set.home) < Number(set.away)) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}

.modal-card-head {
  justify-content: flex-end;
}
</style>
