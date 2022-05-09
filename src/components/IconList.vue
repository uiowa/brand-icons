<template>
  <div class="icon-list" v-if="icons">
    <router-link
      tag="button"
      class="icon-list__button"
      v-for="icon in icons"
      :key="icon.id"
      :to="{ hash: '#' + icon.name }"
      @click="openModal(icon)"
    >
      <Icon :icon="icon.name" :variant="variant" />
      <span class="icon-list__label">{{ icon.name }}</span>
    </router-link>
  </div>
  <div class="content text-center" v-if="icons.length == 0">
    <Icon icon="heart-break" variant="two-color" class="not-found-icon" />
    <p>No icons found.</p>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import Icon from "@/components/Icon.vue";
import IconModal from "@/components/IconModal.vue";

const props = defineProps({
  icons: Object,
  variant: String,
});

const emit = defineEmits(["openModal"]);

function openModal(icon) {
  emit("openModal", icon);
}
</script>

<style lang="scss">
.icon-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  @media only screen and (min-width: 760px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
  }
  @media only screen and (min-width: 1440px) {
    grid-template-columns: repeat(7, 1fr);
  }
  &__button {
    background: #fff;
    padding-top: 30px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 3px;
    display: block;
    text-decoration: none;
    border: 1px solid #ccc;
    cursor: pointer;

    img {
      height: 80px;
      margin: 0 auto;
      display: block;
    }

    &:hover {
      background: #f7f7f7;
    }
  }

  &__label {
    font-size: 0.8rem;
    text-align: center;
    line-height: 1;
    display: block;
    padding: 15px 0;
  }
}
</style>
