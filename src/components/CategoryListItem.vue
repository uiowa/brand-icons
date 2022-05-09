<template>
  <router-link
    @click="scrollToTop"
    :to="{
      name: 'Category',
      params: { category: category.slug },
      query: { search: undefined },
    }"
    class="category-list-item"
    active-class="category-list-item--active"
  >
    <Icon :icon="icon" variant="two-color" class="category-list-item__icon" />
    <div class="category-list-item__title">{{ label }}</div>
    <div class="category-list-item__count">{{ count }}</div>
  </router-link>
</template>
<script setup>
import { defineProps } from "vue";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  label: String,
  icon: String,
  count: Number,
  category: Object,
});

var searchVisible = true;

var observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true) {
      searchVisible = true;
    } else {
      searchVisible = false;
    }
  },
  { threshold: [1] }
);

observer.observe(document.querySelector("#search"));

function scrollToTop() {
  if (!searchVisible) {
    var element = document.getElementById("browser");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
</script>

<style lang="scss">
.category-list-item {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-radius: 3px;
  padding: 0 10px;
  text-decoration: none;
  border: 1px solid rgba(204, 204, 204, 0);

  &:hover,
  &--active {
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 1);
  }

  &__icon {
    display: block;
    width: 100%;
    align-self: center;
    padding: 5px 0;
    height: 40px;
    grid-column: span 2;
  }

  &__title {
    font-size: 0.9rem;
    grid-column: span 3;
    align-self: center;
    line-height: 1;
  }

  &__count {
    font-size: 0.9rem;
    grid-column: span 1;
    justify-self: right;
    align-self: center;
    color: #666;
  }
}
</style>
