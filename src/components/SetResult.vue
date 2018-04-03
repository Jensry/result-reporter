<template>
    <b-field>
        <b-input type="number"
            :placeholder="placeholder"
            :value="value"
            @input="onInput"
            min="0"
            max="30"
            :title="title">
        </b-input>
    </b-field>
</template>

<script>

export default {
  name: 'SetResults',
  props: {
      value: String,
      title: String,
      placeholder: String
  },
  methods: {
    onInput(inputValue) {
        this.$emit('input', inputValue)
    }
  }
}
</script>

<style scoped>

</style>
