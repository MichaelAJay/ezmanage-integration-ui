import { createApp } from "vue";
import router from "./router";
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";

createApp(App).use(DatePicker).use(router).mount("#app");
