<template>
  <div
    class="modal__backdrop"
    @click.self="closeModal(currentCategory, currentSearchTerm)"
  >
    <div class="modal">
      <div class="modal__actions">
        <svg
          @click="closeModal()"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          />
        </svg>
      </div>
      <div class="modal__icon-preview-wrapper">
        <div>
          <div class="icon-preview" :class="iconPreviewClass">
            <Icon
              :icon="icon.name"
              :variant="selectedVariant"
              class="icon-preview__img"
            />
          </div>
          <div class="icon-preview__download">
            <UidsButton
              :url="getIconSrc(icon.name, selectedVariant, 'svg').value"
              text="SVG"
              download="true"
              icon="download"
              v-if="getVariantFormat(selectedVariant, 'svg')"
            />
            <UidsButton
              :url="getIconSrc(icon.name, selectedVariant, 'png').value"
              text="PNG"
              download="true"
              icon="download"
              v-if="getVariantFormat(selectedVariant, 'png')"
            />
          </div>
        </div>
        <div class="modal__preview-actions">
          <h1 class="modal__heading">{{ icon.name }}</h1>
          <p class="text-center">Select a variant:</p>
          <div class="modal__icon-variants-wrapper">
            <div
              v-for="value in variantFormats"
              class="icon-preview icon-preview--small"
              :class="[
                { active: selectedVariant == value.variant },
                'icon-preview--' + value.variant,
              ]"
              :key="value.variant"
            >
              <Icon
                class="icon-preview__img"
                :icon="icon.name"
                :variant="value.variant"
                @click="changeSelectedVariant(value.variant)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="tags">
        <span
          v-for="term in icon.keywords"
          :key="term.id"
          @click="closeModal()"
        >
          <router-link
            class="uids-tag"
            :to="{
              name: 'Search',
              params: { term: term },
            }"
            >#{{ term }}</router-link
          >
        </span>
      </div>
      <!-- <div class="modal__actions">
        <button @click="closeModal()">Close</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import Icon from "@/components/Icon.vue";
import UidsButton from "@/components/UidsButton.vue";
import UidsTag from "@/components/UidsTag.vue";
import getIconSrc from "../composables/getIconSrc.js";

const props = defineProps({
  icon: Object,
  currentCategory: Object,
  currentSearchTerm: String,
  variant: String,
});

const selectedVariant = ref("");
const iconPreviewClass = ref("white");
const emit = defineEmits(["closeModal"]);

selectedVariant.value = props.variant;

// Necessary to map which formats go with variants
// since we don't provide all formats for all variants.
const variantFormats = [
  {
    variant: "one-color",
    formats: ["svg", "png"],
  },
  {
    variant: "two-color",
    formats: ["svg", "png"],
  },
  {
    variant: "gold",
    formats: ["png"],
  },
  {
    variant: "white",
    formats: ["png"],
  },
];

function getVariantFormat(variant, format) {
  let findVariant = variantFormats.find((v) => v.variant == variant);
  if (findVariant) {
    if (findVariant.formats.find((f) => f == format)) {
      return true;
    }
    return false;
  }
}

function changeSelectedVariant(variant) {
  if (variant == "white") {
    iconPreviewClass.value = "icon-preview--white";
  } else {
    iconPreviewClass.value = "";
  }
  selectedVariant.value = variant;
}

function closeModal(currentCategory, currentSearchTerm) {
  emit("closeModal", currentCategory, currentSearchTerm);
}
</script>

<style lang="scss">
.modal {
  width: 50vw;
  padding: 30px;
  padding-top: 20px;
  margin: 100px auto;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  align-self: center;

  &__backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: grid;
    backdrop-filter: blur(2px);
  }

  &__heading {
    text-align: center;
    line-height: 1;
    margin: 0;
    padding: 0;
    display: grid;
    align-self: center;
  }

  &__actions {
    align-self: end;
    text-align: left;
    margin-bottom: 10px;
    margin-top: 0;
    svg {
      width: 15px;
      cursor: pointer;
    }
    button {
      color: #333;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-decoration: none;
      background: white;
      cursor: pointer;
    }
  }

  &__icon-preview-wrapper {
    display: grid;

    grid-gap: 10px;
    margin: 0 auto;

    @media only screen and (min-width: 760px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__preview-actions {
    display: grid;
    p {
      text-align: center;
      margin: 0;
      align-self: end;
    }
  }

  &__icon-variants-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2px;
    max-width: 50%;
    margin: auto;
  }
}

.icon-preview {
  padding: 10%;
  border: 2px solid #eee;
  border-radius: 4px;
  background: white;

  &__img {
    display: block;
    width: 100%;
  }

  &--small {
    border: 2px solid #eee;
    cursor: pointer;
  }
  &.active {
    background: white;
    border-color: #ffcd00;
  }
  &__download {
    margin-top: 20px;
    text-align: center;
  }
}

.icon-preview--white.active {
  background: #545454;
}

.icon-preview--white {
  background: #222;
}

.tags {
  margin-top: 30px;
}
</style>
