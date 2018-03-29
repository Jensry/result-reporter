<template>
    <div class="column">
        <b-input type="tel"
            :placeholder="placeholder"
            :value="value"
            @input="onInput"
            pattern="[0-9][0-9]?-[0-9][0-9]?"
            :title="title">
        </b-input>
    </div>
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
        this.$emit('input', inputValue);
    }
  }
}
</script>

<style scoped>

</style>
