<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/core/Header.vue";
import MainPage from "./views/MainPage.vue";

let count = ref(0);
</script>

<template>
  <v-app theme="dark" color="primary">
    <v-main>
      <Header />
      <Suspense>
        <template #fallback>Loading...</template>
        <MainPage />
      </Suspense>
    </v-main>
  </v-app>
</template>

<style></style>
