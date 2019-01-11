<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Fel</p>
                <button type="button" class="delete" aria-label="close" @click="$emit('cancel')"></button>
            </header>
            <section class="modal-card-body">
                <div class="has-text-centered">Ett fel inträffade, var vänlig försök igen.</div>
            </section>
            <footer class="modal-card-foot">
                <button type="button" class="button is-primary" @click="$emit('ok')">Ok</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    error: String
  }
};
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
