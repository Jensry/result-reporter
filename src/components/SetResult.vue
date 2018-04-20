<template>
  <div>
    <label class="label" v-show="heading">{{heading}}</label>
    <div class="columns is-gapless is-mobile">
      <div class="column">
        <b-field>
          <b-input 
            type="number"
            placeholder="Hemmalag"
            v-model="home"
            @input="onInput"
            min="0"
            max="30"
            :required="required ? true : false">
          </b-input>
        </b-field>
      </div>
      <div class="column is-narrow">
        <span class="span">-</span>
      </div>
      <div class="column">
        <b-field>
          <b-input 
            type="number"
            placeholder="Bortalag"
            v-model="away"
            @input="onInput"
            min="0"
            max="30"
            :required="required ? true : false">
          </b-input>
        </b-field>
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
    required: {
      type: Boolean
    }
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
    margin-left: 8px;
    margin-right: 8px;
    position: relative;
    top: 4px;
  }
</style>
