<template>
  <div class="content text-center">
    <Icon icon="heart-break" variant="two-color" class="not-found-icon" />
    <h1>404</h1>
    <p>Page or icon not found.</p>
  </div>
</template>
<script setup>
import Icon from "@/components/Icon.vue";
</script>

<style lang="scss">
.not-found-icon {
  max-width: 200px;
}
</style>