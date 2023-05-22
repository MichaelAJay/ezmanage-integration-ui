<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="block text-gray-700 text-lg font-bold mb-2">Login</h1>
      <form @submit.prevent="submitForm" class="mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Username:</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            v-model="username"
            type="text"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Password:</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            v-model="password"
            type="password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
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
