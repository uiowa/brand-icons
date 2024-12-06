<template>
  <IconList :icons="icons" :variant="currentVariant" @openModal="openModal" />
</template>

<script setup>
import IconList from "@/components/IconList.vue";
// import getCats from '../composables/getCats.js'
import { ref, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import catData from "/node_modules/uiowa-brand-icons/categories.json";
import iconsData from "/node_modules/uiowa-brand-icons/icons.json";

const search = ref("");
const route = useRoute();
const router = useRouter();
const currentSearchTerm = ref(null);

const emit = defineEmits(["openModal", "setCurrentSearchTerm"]);
const props = defineProps({
  currentVariant: String,
});

// currentSearchTerm.value = route.params.term;
setCurrentSearchTerm(route.params.term);

// Build the filtered icon list based on search term:
const icons = computed(() => {
  if (route.params.term) {
    currentSearchTerm.value = route.params.term;
    return searchData(currentSearchTerm.value);
  }
});

router.beforeEach((to, from) => {
  // Update search term ref if user gets to a search route from an example search link:
  if (to.name == "Search") {
    setCurrentSearchTerm(to.params.term);
  } else {
    // If the user goes to another route, just clear out search.
    setCurrentSearchTerm("");
  }
});

function openModal(icon) {
  emit("openModal", icon);
}

function setCurrentSearchTerm(term) {
  emit("setCurrentSearchTerm", term);
}

function searchData(term) {
  // --------------- //
  // -   Search    - //
  // --------------- //

  let results = [];
  let resultsSet = new Set();

  // Normalize search term to lower case, remove hashtags:
  let termFiltered = term.replace("#", "").toLowerCase();

  let iconsFilteredByName = iconsData.icons.filter(function (icon) {
    return icon.name.includes(termFiltered.replace(" ", "-"));
  });
  let iconsFilteredByKeyword = iconsData.icons.filter(function (icon) {
    return icon.keywords.includes(termFiltered);
  });

  results = results.concat(iconsFilteredByName, iconsFilteredByKeyword);
  results.forEach((item) => {
    resultsSet.add(item);
  });

  let iconsFiltered = [...resultsSet];
  iconsFiltered.sort((a, b) => a.name.localeCompare(b.name));

  if (iconsFiltered.length == 0) {
    gtag("event", "search_no_results", { search_term: term });
  }
  return iconsFiltered;
}
</script>
