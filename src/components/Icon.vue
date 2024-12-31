<template>
  <img
    :icon="icon"
    :variant="variant"
    :format="format"
    :src="getIconSrc(icon, variant, format).value"
    :alt="icon"
    loading="lazy"
    :class="variant"
    height="100"
    width="100"
  />
</template>

<script setup>
import getIconSrc from "../composables/getIconSrc.js";
import { ref } from "vue";
const props = defineProps({
  icon: String,
  variant: String,
  format: String,
  height: String,
  width: String
});
</script>

<style></style>
