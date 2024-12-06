<template>
  <IconList :icons="icons" :variant="currentVariant" @openModal="openModal" />
</template>

<script setup>
import IconList from "@/components/IconList.vue";

// import getCats from '../composables/getCats.js'
import { ref, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import iconsData from "/node_modules/uiowa-brand-icons/icons.json";

const route = useRoute();

const emit = defineEmits(["openModal"]);
const props = defineProps({
  currentVariant: String,
});

const icons = ref(iconsData.icons.sort((a, b) => a.name.localeCompare(b.name)));

function openModal(icon) {
  emit("openModal", icon);
}
</script>
