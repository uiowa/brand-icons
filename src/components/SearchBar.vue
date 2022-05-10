<template>
  <div class="search">
    <form
      @submit.prevent="handleSearch(currentSearchTerm)"
      class="search__form"
    >
      <input
        type="search"
        placeholder="Search over 500 icons by name or category."
        class="search__input"
        :value="currentSearchTerm"
        @change="setCurrentSearchTerm($event.target.value)"
        @focus="$event.target.select()"
      />
      <button class="search__button">Search</button>
    </form>
    <p class="search__examples">
      Search examples:
      <span v-for="term in exampleSearchTerms" :key="term.id">
        <router-link
          class="uids-tag"
          :to="{
            name: 'Search',
            params: { term: term },
          }"
          >#{{ term }}</router-link
        >
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UidsButton from "@/components/UidsButton.vue";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  currentSearchTerm: String,
});
const emit = defineEmits(["setCurrentSearchTerm"]);

const exampleSearchTerms = [
  "academics",
  "art",
  "accessibility",
  "buildings",
  "chart",
  "checkmark",
  "communication",
  "dining",
  "dei",
  "dollar sign",
  "dentistry",
  "face",
  "finance",
  "flower",
  "graduation",
  "health",
  "heart",
  "iowa",
  "medical cross",
  "music",
  "outdoors",
  "person",
  "star",
  "sports",
  "tech",
  "transportation",
];

function handleSearch(term) {
  if (term) {
    setCurrentSearchTerm(term);
    router.push({
      name: "Search",
      params: { term: term },
    });
  }
}

function setCurrentSearchTerm(term) {
  emit("setCurrentSearchTerm", term);
}
</script>

<style lang="scss">
.search {
  grid-column: 1 / 13;
  align-self: center;
  @media only screen and (min-width: 1024px) {
    grid-column: 3 / 11;
  }

  &__form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__input {
    display: block;
    margin: 0;
    border: 1px solid #ccc;
    border-right: none;
    padding: 20px;
    width: 100%;
    height: 60px;
    font-size: 1.3rem;
  }

  &__button {
    background: #ffcd00;
    color: black;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-right: none;
    margin: 0;
    font-size: 1.3rem;
    height: 60px;
    cursor: pointer;
  }
  &__examples {
    padding: 0 30px;
    text-align: center;
    font-size: 1rem;
  }
}
</style>
