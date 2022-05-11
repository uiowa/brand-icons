<template>
  <IowaBar />
  <div class="wrapper">
    <header class="header">
      <h1 class="header__title">
        <router-link
          :to="{
            name: 'Home',
          }"
          >Brand Icon Browser</router-link
        >
      </h1>
    </header>
    <SearchBar
      id="search"
      @setCurrentSearchTerm="setCurrentSearchTerm"
      :currentSearchTerm="currentSearchTerm"
    />
  </div>
  <Settings
    @setVariantOneColor="setVariant('one-color')"
    @setVariantTwoColor="setVariant('two-color')"
    :currentVariant="currentVariant"
  />
  <div class="bg-gray" id="browser">
    <div class="wrapper">
      <aside>
        <CategoryList />
      </aside>
      <main aria-live="polite">
        <router-view
          @openModal="openModal"
          :currentVariant="currentVariant"
          @setCurrentSearchTerm="setCurrentSearchTerm"
        />
      </main>
    </div>
  </div>

  <teleport to=".modals" v-if="showModal">
    <IconModal
      @closeModal="closeModal"
      :variant="currentVariant"
      :icon="iconDetails"
    />
  </teleport>
  <UidsFooter />
</template>

<style lang="scss">
body {
  margin: 0;
  font-family: Roboto, sans-serif;
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.6;
  color: #000;
  text-align: left;
  background-color: #eee;
  text-rendering: optimizeLegibility;
  background-image: url(assets/pattern-bg.png);
  scroll-behavior: smooth;
}

a {
  color: #000;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 0 10px;
  grid-template-columns: repeat(12, 1fr);
}

.bg-gray {
  background: #efefef;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
}

.active {
  background: #eee;
}

.header {
  text-align: center;
  font-size: 4rem;
  grid-column: 1 / 13;
  display: grid;
  min-height: 150px;

  &__title {
    font-weight: 300;
    font-size: 4rem;
    margin: 0;
    align-self: center;
    line-height: 1;
    a {
      text-decoration: none;
    }
  }
}

aside {
  grid-column: 1 / 13;

  @media only screen and (min-width: 760px) {
    grid-column: 1 / 4;
  }

  @media only screen and (min-width: 1280px) {
    grid-column: 1 / 3;
  }
}

main {
  grid-column: 1 / 13;
  @media only screen and (min-width: 760px) {
    grid-column: 4 / 13;
  }

  @media only screen and (min-width: 1280px) {
    grid-column: 3 / 13;
  }
}

.content {
  grid-column: 4 / 11;
}

.text-center {
  text-align: center;
}
</style>
<script setup>
import { ref, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import IowaBar from "@/components/UidsIowaBar.vue";
import UidsFooter from "@/components/UidsFooter.vue";
import SearchBar from "@/components/SearchBar.vue";
import Settings from "@/components/Settings.vue";
import IconList from "@/components/IconList.vue";
import IconModal from "@/components/IconModal.vue";
import CategoryList from "@/components/CategoryList.vue";
import iconsData from "/data/icons.json";

//Initiate app with two color variant for pretty reasons:
const currentVariant = ref("two-color");

const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const iconDetails = ref("");
const currentSearchTerm = ref("");

//If we have an icon in the current URL params, show the icon modal:
if (window.location.hash) {
  let currentIconId = window.location.hash.replace("#", "");
  let currentIcon = iconsData.icons.find(function (icon) {
    return icon.name == currentIconId;
  });
  if (currentIcon) {
    iconDetails.value = currentIconId;
    openModal(currentIcon);
  }
}

function setCurrentSearchTerm(term) {
  currentSearchTerm.value = term;
}

function openModal(icon) {
  showModal.value = true;
  iconDetails.value = icon;
}

function setVariant(variant) {
  currentVariant.value = variant;
}

function closeModal() {
  router.push({ hash: "" });
  showModal.value = false;
}
</script>
