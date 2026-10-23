import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const root = fileURLToPath(new URL(".", import.meta.url));

// Replaces the analytics placeholder in index.html.
function analytics(env) {
  const code = env.VITE_ANALYTICS_CODE;
  const snippet =
    env.VITE_ENABLE_ANALYTICS === "true"
      ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${code}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${code}');
    </script>`
      : `<script>
      function gtag(){return}
    </script>`;
  return {
    name: "analytics",
    transformIndexHtml: (html) => html.replace(
        "<!-- analytics: replaced by vite.config.js, defines gtag() -->",
        snippet
      ),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root);
  return {
    plugins: [vue(), analytics(env)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": root,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [root],
        },
      },
    },
  };
});
