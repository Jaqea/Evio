import { createApp } from "vue";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";
import { setupVueRouter } from "./router";
import App from "./App.vue";

async function setupApp() {
  setupAssets();

  const app = createApp(App);

  setupStore(app);

  await setupVueRouter(app);

  app.mount("#app");
}

setupApp();
