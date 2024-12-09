<template>
  <div class="settings__variant-selector">
    <vue-toggle
      activeColor="#ffcd00"
      title="Color"
      name="vue-toggle"
      :toggled="true"
      @toggle="toggleVariantColor"
    />
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { defineProps } from "vue";
import VueToggle from "vue-toggle-component";
import { ref } from "vue";

const props = defineProps({
  currentVariant: String,
});

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
    .m-toggle__content {
      background: #d7d7d7;
      border: 1px solid #bab8b8;
      padding: 4px;

      &:after {
        width: calc(50% - 4px);
      }
    }
  }
}
</style>
