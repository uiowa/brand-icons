<template>
  <nav aria-label="Skip links">
    <a href="#main-content" class="skip-link">Skip to main content</a>
  </nav>
  <header class="iowa-bar iowa-bar--full horizontal" data-uids-header>
    <div class="iowa-bar__container">
      <div class="logo logo--tab">
        <a href="https://uiowa.edu">
          <div class="element-invisible">The University of Iowa</div>
          <svg xmlns="http://www.w3.org/2000/svg" class="logo-icon" aria-labelledby="brand-bar-logo" role="img" viewBox="0 0 311.6 90.2">
            <title id="brand-bar-logo">University of Iowa</title>
            <path class="st0" d="M40 18.8h-7.3v52.4H40v19H0v-19h7.3V18.8H0V0h40V18.8z"/>
            <path class="st0" d="M93.8 90.2h-29c-10.5 0-17.4-6.9-17.4-18.2V18.2C47.4 7 54.4 0 64.8 0h29c10.5 0 17.4 7 17.4 18.2V72C111.2 83.2 104.2 90.2 93.8 90.2zM85.6 71.2V18.8H73v52.4H85.6z"/>
            <path class="st0" d="M122.6 18.8h-6.4V0h38v18.9H147l6.5 43.4L167 0h19.2l14.4 62.3 5.2-43.4h-6.6V0h37.5v18.9h-6.2l-11.3 71.4h-30.6l-11.8-53.2 -12.1 53.1h-29.4L122.6 18.8z"/>
            <path class="st0" d="M230.1 71.2h6.9L250.7 0h41l13.5 71.2h6.4v19H281l-2.9-22h-15.2l-2.7 22h-30L230.1 71.2 230.1 71.2zM276.5 51.7l-5.8-36.4 -6 36.4H276.5z"/>
          </svg>
        </a>
      </div>
      <h1 class="site-name">
        <router-link :to="{ name: 'Home' }">Icon Browser</router-link>
      </h1>
      <nav
        role="navigation"
        aria-labelledby="toplinks-menu"
        id="toplinks"
        class="menu--top"
      >
        <h2 class="visually-hidden" id="toplinks-menu">Top links</h2>
        <ul class="menu">
          <li>
            <a href="https://brand.uiowa.edu/graphic-elements#iconography"
              >Icon Usage</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="wrapper" id="main-wrapper">
    <aside>
      <div class="sticky">
        <CategoryList />
        <div class="download-section">
          <a
            href="https://github.com/uiowa/brand-icons/archive/refs/heads/main.zip"
            class="bttn bttn--tertiary bttn--small bttn--full"
            download
            >Download all
            <i role="presentation" class="fas fa-download"></i>
          </a>
        </div>
        <p class="feedback">
          <a href="mailto:osc-brand@uiowa.edu?subject=Icon Browser Feedback"
            >Submit Feedback</a
          >
          <a href="https://uiowa.edu/privacy">Privacy Notice</a>
        </p>
        <p class="copyright-container">
          &copy; {{ currentYear }} The University of Iowa
        </p>
      </div>
    </aside>

    <main class="main-container" id="main-content" tabindex="-1">
      <div class="toolbar sticky">
        <SearchBar
          id="search"
          @setCurrentSearchTerm="setCurrentSearchTerm"
          :currentSearchTerm="currentSearchTerm"
        />
        <Settings
          @toggleVariantColor="toggleVariantColor"
          :currentVariant="currentVariant"
        />
      </div>

      <router-view
        @openModal="openModal"
        @setCurrentSearchTerm="setCurrentSearchTerm"
        :currentVariant="currentVariant"
      />
    </main>
  </div>

  <teleport to=".modals" v-if="showModal">
    <IconModal
      @closeModal="closeModal"
      :variant="currentVariant"
      :icon="iconDetails"
    />
  </teleport>
</template>

<style lang="scss">
@import "node_modules/uids/src/scss/uids-core.scss";
@import "node_modules/uids/src/scss/components/logo.scss";
@import "node_modules/uids/src/scss/components/brand-bar.scss";
@import "node_modules/uids/src/scss/components/button.scss";
@import "~/src/scss/components/top-menu.scss";

body {
  margin: 0;
  font-family: Roboto, sans-serif;
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.6;
  color: #000;
  text-align: left;
  background-color: #f5f5f5;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;

  &.modal-open {
    height: 100vh;
    overflow: hidden;
  }
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
  max-width: 1550px;
}

.main-container {
  @media only screen and (min-width: 760px) {
    scroll-margin-top: 80px;
  }
  outline: none;
}

.toolbar {
  padding: 10px 0;
  background: #f5f5f5de;
  background: linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(245,245,245,0.87) 10%, rgba(245,245,245,0.87) 90%, rgba(245,245,245,1) 100%);
  backdrop-filter: blur(5px);

  @media only screen and (min-width: 760px) {
    display: flex;
    justify-content: start;
    align-items: center;
  }
}

.sticky {
  @media only screen and (min-width: 760px) {
    position: sticky;
    top: 0;
  }
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

.download-section {
  margin-top: 20px;
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

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 9999;
  padding: 12px 20px;
  background: #000;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  &:focus {
    top: 0;
  }
}

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important; /* 3 */
}
.feedback {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 0;
  font-size: 13px;
  a {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    &:not(:last-child) {
      padding-left: 0;
      border-right: 1px solid rgba(0, 0, 0, 0.425);
    }
  }
}

.copyright-container {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
}
</style>
<script setup>
import { ref, computed, onUpdated, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import iconsData from "../icons.json";
import CategoryList from "@/components/CategoryList.vue";
//import IconList from "@/components/IconList.vue";
import IconModal from "@/components/IconModal.vue";
import SearchBar from "@/components/SearchBar.vue";
import Settings from "@/components/Settings.vue";
//Initiate app with two color variant for pretty reasons:
const currentVariant = ref("two-color");

const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const iconDetails = ref("");
const currentSearchTerm = ref("");
let lastFocused = null;
var currentYear = new Date().getFullYear();

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
  lastFocused = document.activeElement;
  showModal.value = true;
  document.body.classList.add("modal-open");
  iconDetails.value = icon;
}

function toggleVariantColor() {
  // Wait 200ms before toggling between colors to make the toggle animation smoother.
  // I don't like this, but feel compelled to do it.
  setTimeout(() => {
    if (currentVariant.value == "one-color-black") {
      currentVariant.value = "two-color";
    } else {
      currentVariant.value = "one-color-black";
    }
  }, 300);
}

function closeModal() {
  router.push({ hash: "" });
  document.body.classList.remove("modal-open");
  showModal.value = false;
  nextTick(() => {
    if (lastFocused) lastFocused.focus();
  });
}
</script>
