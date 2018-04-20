<template>
  <div class="columns is-8 is-variable">
    <div class="column">
      <set-result
        heading="Set 1"
        :required="true"
        @input="(value) => onInput('set1', value)"
      >
      </set-result>
    </div>
    <div class="column">
      <set-result
        heading="Set 2"
        :required="true"
        @input="(value) => onInput('set2', value)"
      >
      </set-result>
    </div>
    <div class="column">
      <set-result
        heading="Set 3"
        @input="(value) => onInput('set3', value)"
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
        set1: {home: '', away: ''},
        set2: {home: '', away: ''},
        set3: {home: '', away: ''},
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
