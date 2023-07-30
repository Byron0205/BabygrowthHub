import "./assets/normalize.css";
import "./assets/base.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Escuchar mensajes postMessage desde el exterior de la aplicación Vue
window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "verActividad") {
        const urlDestino = event.data.data;
        router.push(urlDestino);
    }
});

const app = createApp(App);

app.use(router);

app.mount("#app");
