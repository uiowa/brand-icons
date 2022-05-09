<template>
  <div class="category-list">
    <ul class="category-list__list">
      <li class="category-list__item">
        <router-link
          :to="{ name: 'Home' }"
          class="category-list-item"
          active-class="category-list-item--active"
        >
          <Icon
            icon="open-book"
            variant="two-color"
            class="category-list-item__icon"
          />
          <div class="category-list-item__title">All brand icons</div>
          <div class="category-list-item__count">{{ icons.length }}</div>
        </router-link>
      </li>
      <li
        v-for="category in categories"
        :key="category.title"
        class="category-list__item"
      >
        <CategoryListItem
          :label="category.label"
          :icon="category.icon"
          :category="category"
          :count="category.icons.length"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import catData from "/data/categories.json";
import iconsData from "/data/icons.json";
import CategoryListItem from "@/components/CategoryListItem.vue";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  icon: String,
  currentCategory: String,
});

const emit = defineEmits(["clearCurrentCategory"]);
const categories = catData.categories;
const icons = iconsData.icons;
</script>

<style lang="scss">
.category-list {
  position: sticky;
  top: 0;

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: grid;
    row-gap: 10px;
  }
}
</style>
