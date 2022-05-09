<template>
  <main aria-live="polite">
    <IconList :icons="icons" :variant="currentVariant" @openModal="openModal" />
  </main>
</template>

<script setup>
import IconList from "@/components/IconList.vue";

// import getCats from '../composables/getCats.js'
import { ref, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import iconsData from "/data/icons.json";

const route = useRoute();

const emit = defineEmits(["openModal"]);
const props = defineProps({
  currentVariant: String,
});

const icons = ref(iconsData.icons);

function openModal(icon) {
  emit("openModal", icon);
}
</script>
