// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  srcDir: "src/",
  css: ["~/assets/css/tailwind.css", "~/assets/css/global.css"],
  modules: ["@ant-design-vue/nuxt", "@nuxt/image", "@nuxtjs/i18n", "@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/color-mode"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
