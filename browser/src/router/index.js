import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import SearchView from "../views/SearchView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import catData from "/node_modules/uiowa-brand-icons/categories.json";
import iconsData from "/node_modules/uiowa-brand-icons/icons.json";

const categories = catData.categories;
const icons = iconsData.icons;
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "All Icons",
      metaTags: [
        {
          name: "description",
          content: "Browse over 500 University of Iowa brand icons",
        },
        {
          property: "og:description",
          content: "Browse over 500 University of Iowa brand icons",
        },
      ],
    },
  },
  {
    path: "/category/:category",
    name: "Category",
    component: CategoryView,
    meta: {
      title: "Category",
      metaTags: [
        {
          name: "description",
          content: "Browse over 500 University of Iowa brand icons",
        },
        {
          property: "og:description",
          content: "Browse over 500 University of Iowa brand icons",
        },
      ],
    },
  },
  {
    path: "/search/:term",
    name: "Search",
    component: SearchView,
    meta: {
      title: "Search",
      metaTags: [
        {
          name: "description",
          content: "Browse over 500 University of Iowa brand icons",
        },
        {
          property: "og:description",
          content: "Browse over 500 University of Iowa brand icons",
        },
      ],
    },
  },
  // catchall 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: {
      title: "Page or Icon Not Found",
      metaTags: [
        {
          name: "description",
          content: "Browse over 500 University of Iowa brand icons",
        },
        {
          property: "og:description",
          content: "Browse over 500 University of Iowa brand icons",
        },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  let generatedTitle = "";
  let titleSuffix = "Icon Browser - The University of Iowa";
  let icon = null;
  let category = null;
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    // Check if an icon hash is in the destination URL, set an icon var if so:
    if (to.hash) {
      let iconName = to.hash.replace("#", "").toLowerCase();
      icon = icons.find((icon) => icon.name === iconName);
    }

    //Check if a category is in the destination URL, set a category var if so:
    if (to.params.category) {
      category = categories.find(
        (category) => category.slug === to.params.category
      );
    }
    // Check for icon or category values.
    //Prepend either an icon name or a category name if available, but not both, prefer icon name if both:
    if (icon) {
      generatedTitle = icon.name;
    } else if (category) {
      generatedTitle = category.label;
    } else {
      generatedTitle = nearestWithTitle.meta.title;
    }
    //fall back on a parent route with a title:
  } else if (previousNearestWithMeta) {
    generatedTitle = previousNearestWithMeta.meta.title;
    //fall back on a route title:
  } else {
    generatedTitle = nearestWithTitle.meta.title;
  }

  document.title = generatedTitle + " | " + titleSuffix;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  // Scroll to the top of the document after changing route only if it the route's to/from
  // doesn't contain a hash. Prevents scrolling to top when opening or closing a modal.
  // If target route is a search or category, scroll the toolbar into view instead.
  // @todo: refactor this a bit.
  if (!to.hash && !from.hash) {
    if (to.name == "Search" || to.name == "Category" || to.name == "Home") {
      scrollToResults();
    } else {
      scrollToTop();
    }
  }
  next();
});

function scrollToTop() {
  var element = document.querySelector(".iowa-bar");
  element.scrollIntoView({
    block: "start",
    inline: "nearest",
  });
}

function scrollToResults() {
  var element = document.querySelector(".main-container");
  element.scrollIntoView({
    alignToTop: true,
    block: "start",
    inline: "nearest",
  });
}
export default router;
