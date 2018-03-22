<template>
    <b-field :label="label">
        <b-select v-model="value" expanded>
            <option value="">Välj spelare...</option>
            <option
                v-for="player in players"
                :value="player"
                :key="player">
                {{ player }}
            </option>
        </b-select>
    </b-field>
</template>

<script>

export default {
  name: 'PlayerNameInput',
  props: {
      value: String,
      label: String,
      id: String,
      players: Array
  },
  methods: {
    updateValue(value) {
        this.$emit('input', value);
    }
  }
}
</script>

<style scoped>

</style>
