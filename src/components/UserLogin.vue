<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" />

      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "@/api/api";
import router from "@/router";

export default defineComponent({
  name: "UserLogin",
  setup() {
    const username = ref("");
    const password = ref("");

    async function submitForm() {
      try {
        const response = await api.post("/users/login", {
          username: username.value,
          password: password.value,
        });

        if (response.status === 201) {
          router.push("/orders");
        } else {
          throw new Error("Bad login");
        }
      } catch (err) {
        console.error("err", err);
        throw err;
      }
    }

    return {
      username,
      password,
      submitForm,
    };
  },
});
</script>
