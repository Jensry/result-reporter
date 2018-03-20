<template>
    <div class="form-group">
        <label :for="id">{{ label }}</label>
        <select class="form-control" :id="id" v-on:input="updateValue($event.target.value)">
            <option value="">Välj spelare...</option>
            <option v-for="player in players" v-bind:key="player.id">
                {{ player }}
            </option>
        </select>
    </div>
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
