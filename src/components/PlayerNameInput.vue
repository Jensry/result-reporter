<template>
    <b-field :label="label">
        <span class="select is-fullwidth">
            <select :id="id" v-on:input="onInput($event.target.value)" required>
                <option value="">Välj spelare...</option>
                <option v-for="player in players" v-bind:key="player.id">
                    {{ player }}
                </option>
            </select>
        </span>
    </b-field>
</template>

<script>
export default {
  name: "PlayerNameInput",
  props: {
    label: String,
    id: String,
    players: Array
  },
  methods: {
    onInput(inputValue) {
      this.$emit("input", inputValue);
    }
  }
};
</script>

<style scoped>
</style>
