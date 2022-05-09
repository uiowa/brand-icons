import {ref} from "vue";

const getIconSrc = (icon, variant, format) => {
    // This could be cleaned up signficantly if the icons were in the filesystem in a more consistent way, ex:
    // - icon-two-color.svg
    // - icon-two-color.png
    // - icon-black.svg
    // - icon-black.png
    // - icon-white.svg
    // - icon-white.png
    // - icon-gold.svg
    // - icon-gold.png
    // Right now the code below is respecting the current file structure:
    const currentIcon = ref("");

    if (variant == "one-color") {
        if (format) {
            if (format == "png") {
                currentIcon.value = "/brand-icons/" + icon + "-BLACK." + format;
            } else {
                currentIcon.value = "/brand-icons/" + icon + "." + format;
            }

        } else {
            currentIcon.value = "/brand-icons/" + icon + ".svg";
        }
    } else if (variant == "two-color") {
        if (format) {
            currentIcon.value = "/brand-icons/" + icon + "-" + variant + "." + format;
        } else {
            currentIcon.value = "/brand-icons/" + icon + "-" + variant + ".svg";
        }
    } else if (variant == "gold") {
        currentIcon.value = "/brand-icons/" + icon + "-GOLD.png";
    } else if (variant == "white") {
        currentIcon.value = "/brand-icons/" + icon + "-REVERSED.png";
    } else {
        currentIcon.value = "/brand-icons/" + icon + "-" + variant + ".svg";
    }

    return currentIcon;
};

export default getIconSrc;
