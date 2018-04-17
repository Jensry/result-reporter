<template>
  <div>
    <b class="is-size-6" v-show="heading">{{heading}}</b>
    <div class="columns is-gapless is-mobile">
      <div class="column">
        <b-input
          type="number"
          placeholder="Hemmalag"
          v-model="home"
          @input="onInput"
        >
        </b-input>
      </div>
      <div class="column is-narrow">
        <span class="span">-</span>
      </div>
      <div class="column">
        <b-input
          type="number"
          placeholder="Bortalag"
          v-model="away"
          @input="onInput"
        >
        </b-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameResultInput',
  props: {
    heading: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      home: '',
      away: '',
    };
  },
  methods: {
    onInput() {
      this.$emit('input', {home: this.home, away: this.away});
    },
  },
}
</script>

<style lang="scss" scoped>
  .span {
    margin-left: 4px;
    margin-right: 4px;
    position: relative;
    top: 4px;
  }
</style>
