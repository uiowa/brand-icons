<template>
  <img
    :icon="icon"
    :variant="variant"
    :src="getIconSrc(icon, variant).value"
    :alt="icon"
    loading="lazy"
    :class="variant"
  />
</template>

<script setup>
import getIconSrc from "../composables/getIconSrc.js";
import { ref } from "vue";
const props = defineProps({
  icon: String,
  variant: String,
  format: String,
});
</script>

<style></style>
