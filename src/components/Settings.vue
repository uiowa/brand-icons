<template>
  <div class="settings">
    <p class="settings-label">
      <span><Icon icon="mechanical-gears" variant="one-color" /></span>
    </p>
    <FilterButton
      label="One-color"
      icon="paintbrush"
      variant="one-color"
      @click="setVariantOneColor"
      :currentVariant="currentVariant"
    />
    <FilterButton
      label="Two-color"
      icon="paintbrush"
      variant="two-color"
      @click="setVariantTwoColor"
      :currentVariant="currentVariant"
    />
    <UidsButton
      url="/brand-icons.zip"
      text="Download all"
      download="true"
      icon="download"
    />
  </div>
</template>

<script setup>
import FilterButton from "@/components/FilterButton.vue";
import UidsButton from "@/components/UidsButton.vue";
import Icon from "@/components/Icon.vue";
import { defineProps } from "vue";

const props = defineProps({
  currentVariant: String,
});

const emit = defineEmits(["setVariantOneColor", "setVariantTwoColor"]);

function setVariantOneColor() {
  emit("setVariantOneColor");
}
function setVariantTwoColor() {
  emit("setVariantTwoColor");
}
</script>

<style lang="scss">
.settings {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.settings-label {
  display: inline-block;
  align-self: center;
  margin: 0;
  margin-right: 10px;
  img {
    width: 50px;
  }
}
</style>
