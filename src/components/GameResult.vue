<template>
  <div class="columns is-8 is-variable">
    <div class="column">
      <set-result
        heading="Set 1"
        @input="(value) => onInput('setOne', value)"
      >
      </set-result>
    </div>
    <div class="column">
      <set-result
        heading="Set 2"
        @input="(value) => onInput('setTwo', value)"
      >
      </set-result>
    </div>
    <div class="column">
      <set-result
        heading="Set 3"
        @input="(value) => onInput('setThree', value)"
      >
      </set-result>
    </div>
  </div>
</template>

<script>
import SetResult from "./SetResult";

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
  components: {SetResult}
}
</script>

<style lang="scss" scoped>
  .section {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
