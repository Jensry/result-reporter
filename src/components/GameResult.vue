<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <game-result-input
          heading="Set 1"
          @input="(value) => onInput('setOne', value)"
        >
        </game-result-input>
      </div>
      <div class="column">
        <game-result-input
          heading="Set 2"
          @input="(value) => onInput('setTwo', value)"
        >
        </game-result-input>
      </div>
      <div class="column">
        <game-result-input
          heading="Set 3"
          @input="(value) => onInput('setThree', value)"
        >
        </game-result-input>
      </div>
    </div>
  </section>
</template>

<script>
import GameResultInput from "./GameResultInput";

export default {
  name: "GameResult",
  data() {
    return {
      result: {
        setOne: {home: '', away: ''},
        setTwo: {home: '', away: ''},
        setThree: {home: '', away: ''},
      },
    };
  },
  methods: {
    onInput(key, value) {
      this.result[key] = value;
      this.$emit('input', this.result);
    },
  },
  components: {GameResultInput}
}
</script>

<style lang="scss" scoped>
  .section {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
