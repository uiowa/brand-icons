<template>
  <IconList :icons="icons" :variant="currentVariant" @openModal="openModal" />
</template>

<script setup>
// @ is an alias to /src
import IconList from "@/components/IconList.vue";

// import getCats from '../composables/getCats.js'
import { ref, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import catData from "/data/categories.json";
import iconsData from "/data/icons.json";

const route = useRoute();
const router = useRouter();
const currentCategory = ref(null);

const emit = defineEmits(["openModal", "setCurrentSearchTerm"]);
const props = defineProps({
  currentVariant: String,
});

let categories = catData.categories;
let currentCategorySlug = route.params.category;

// Build the filtered icon list based on category:
const icons = computed(() => {
  // If we have a category in the current url params, find a category by that url param:
  if (route.params.category) {
    let currentCategorySlug = route.params.category;
    currentCategory.value = categories.find((category) => {
      return category.slug == currentCategorySlug;
    });
  }

  if (!currentCategory.value) {
    // If category wasn't found, send user to the catchall page
    router.push({ name: "NotFound" });
  }

  let iconObjects = { icons: [] };
  let iconNames = currentCategory.value.icons;
  let iconSet = new Set();
  let iconArray = [];
  let iconsFiltered = [];

  // Get all icon names under a category, then get their objects.
  // @todo This needs to be optimized...
  iconNames.forEach((element) =>
    iconObjects.icons.push(
      iconsData.icons.filter(function (icon) {
        return icon.name.includes(element);
      })
    )
  );

  iconArray = iconObjects.icons.flat();
  iconArray.forEach((item) => {
    iconSet.add(item);
  });

  iconsFiltered = [...iconSet];

  return iconsFiltered;
});

function openModal(icon) {
  emit("openModal", icon);
}
</script>
