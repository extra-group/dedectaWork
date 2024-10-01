// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  runtimeConfig: {
    public: {
      apiURLInstagram:
        process.env.API_INSTAGRAM_URL ||
        "https://instagram-scraper-api2.p.rapidapi.com/v1.1/hashtag?",
      apiURLTwitter:
        process.env.API_TWITTER_URL ||
        "https://twitter154.p.rapidapi.com/search/search/continuation?",
      apiKeyTwitter:
        process.env.API_KEY_TWITTER ||
        "af717fa85cmsh5c905eb77e872c3p184c12jsnac491d5ca93b",
      apiKeyInstagram:
        process.env.API_KEY_INSTAGRAM ||
        "d8e11cc399msh5955dcb503544dap13dc2ejsn4d181a8ab1cf",
    },
  },
});
