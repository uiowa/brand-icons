<template>
  <div class="settings__variant-selector">
    <button
      class="color-toggle"
      role="switch"
      :aria-checked="isColor ? 'true' : 'false'"
      @click="toggleVariantColor"
    >
      <span class="color-toggle__label">Color</span>
      <span class="color-toggle__track" aria-hidden="true">
        <span class="color-toggle__thumb"></span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentVariant: String,
});

const isColor = computed(() => props.currentVariant === "two-color");

const emit = defineEmits(["toggleVariantColor"]);

function toggleVariantColor() {
  emit("toggleVariantColor");
}
</script>

<style lang="scss">
.settings {
  &__variant-selector {
    margin: auto;
    padding-top: 10px;
    padding-bottom: 0;
    @media only screen and (min-width: 760px) {
      margin-left: auto;
      padding: 0 20px;
    }
  }
}

.color-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  padding: 4px;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid #ffcd00;
    outline-offset: 2px;
  }

  &__label {
    font-size: 0.95rem;
  }

  &__track {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
    background: #d7d7d7;
    border: 1px solid #bab8b8;
    border-radius: 13px;
    padding: 3px;
    transition: background 0.2s, border-color 0.2s;
  }

  &__thumb {
    display: block;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;
  }

  &[aria-checked="true"] {
    .color-toggle__track {
      background: #ffcd00;
      border-color: #e0b800;
    }
    .color-toggle__thumb {
      transform: translateX(22px);
    }
  }
}
</style>
