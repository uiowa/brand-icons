<template>
  <button class="uids-button" :class="isActive()">
    <div class="uids-button-inner">
      <Icon
        :icon="icon"
        :variant="variant"
        class="uids-button-inner__icon uids-button-inner__icon--text-right"
        v-if="icon"
      />
      <div class="uids-button-inner__title">
        {{ label }}
      </div>
    </div>
  </button>
</template>

<script setup>
import { defineProps, computed } from "vue";
import Icon from "@/components/Icon.vue";
const props = defineProps({
  label: String,
  icon: String,
  variant: String,
  currentVariant: String,
});

function isActive() {
  if (props.currentVariant == props.variant) {
    return "active";
  }
  return false;
}
</script>

<style lang="scss">
</style>
