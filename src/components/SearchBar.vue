<template>
  <div class="search">
    <form
      @submit.prevent="handleSearch(currentSearchTerm)"
      class="search__form"
    >
      <input
        type="search"
        placeholder="Examples: academics, accessibility, buildings, heart, iowa"
        class="search__input"
        :value="currentSearchTerm"
        @change="setCurrentSearchTerm($event.target.value)"
        @focus="$event.target.select()"
      />
      <button class="search__button">
        <svg
          id="search"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 23"
        >
          <title>search</title>
          <path
            d="M19.82,16.38l-3.15-3.15a6.25,6.25,0,0,0,1.14-3.66,6.36,6.36,0,0,0-.51-2.51A6.68,6.68,0,0,0,15.93,5a6.45,6.45,0,0,0-2.07-1.37,6.41,6.41,0,0,0-5,0A6.29,6.29,0,0,0,6.79,5,6.54,6.54,0,0,0,5.41,7.06a6.43,6.43,0,0,0,0,5,6.47,6.47,0,0,0,5.95,4A6.24,6.24,0,0,0,15,14.89L18.16,18a1.08,1.08,0,0,0,.82.34,1.13,1.13,0,0,0,.83-.34,1.16,1.16,0,0,0,.35-.83A1.13,1.13,0,0,0,19.82,16.38Zm-5.56-3.91a3.94,3.94,0,0,1-2.9,1.21A4.11,4.11,0,0,1,7.25,9.57a4,4,0,0,1,1.2-2.9,4.09,4.09,0,0,1,5.81,0,4,4,0,0,1,1.2,2.9A4,4,0,0,1,14.26,12.47Z"
          />
        </svg>

        <span class="sr-only">Search</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const props = defineProps({
  currentSearchTerm: String,
});
const emit = defineEmits(["setCurrentSearchTerm"]);

function handleSearch(term) {
  if (term) {
    gtag("event", "search", { search_term: term });
    setCurrentSearchTerm(term);
    router.push({
      name: "Search",
      params: { term: term },
    });
  } else {
    // If no search term, send the user back home:
    router.push({
      name: "Home",
    });
  }
}

function setCurrentSearchTerm(term) {
  emit("setCurrentSearchTerm", term);
}
</script>

<style lang="scss">
.search {
  width: 100%;

  &__form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__input[type="search"] {
    display: block;
    margin: 0;
    border: 1px solid #ccc;
    border-right: none;
    padding: 20px;
    width: 100%;
    height: 60px;
    font-size: 1.3rem;
    border-radius: 0;
    -webkit-appearance: none;
    background: white;
    &:focus {
      z-index: 1;
    }
  }
  // Hide default mobile Safari search icons
  &__input[type="search"]::-webkit-search-decoration,
  &__input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
  &__button {
    color: black;
    background: white;
    padding: 0 5px;
    border-left: 0;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin: 0;
    font-size: 1.3rem;
    height: 60px;
    cursor: pointer;

    @media only screen and (min-width: 760px) {
      padding: 0 20px;
    }
    svg {
      display: block;
      width: 40px;
    }
  }
}
</style>
