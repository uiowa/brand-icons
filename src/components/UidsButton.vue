<template>
  <a class="uids-button" :href="url" :download="download ? '' : undefined">
    <div class="uids-button-inner">
      <span class="uids-button-inner__title">{{ text }}</span>
      <Icon
        v-if="icon"
        :icon="icon"
        variant="two-color"
        class="uids-button-inner__icon"
      />
    </div>
  </a>
</template>

<script setup>
import { defineProps, computed } from "vue";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  url: String,
  text: String,
  download: String,
  icon: String,
});
</script>

<style lang="scss">
.uids-button {
  display: inline-block;
  background: #fff;
  color: black;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  line-height: 1;
  margin-right: 5px;
  text-decoration: none;
}
.uids-button-inner {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #d0d0d0;
  }

  &__icon {
    display: flex;
    align-self: left;
    height: 30px;
    margin-left: 10px;

    &--text-right {
      margin-left: 0;
      margin-right: 10px;
    }
  }

  &__title {
    font-family: "Roboto", sans;
    display: flex;
    font-size: 0.9rem;
    align-self: center;
  }
}
</style>