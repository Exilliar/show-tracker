<script setup lang="ts">
import MainTable from "@/components/mainPage/MainTable.vue";
import AddModal from "@/components/mainPage/AddModal.vue";
import ErrorRetry from "@/components/shared/ErrorRetry.vue";

import { useDatabase } from "@/composables/useDatabase";
import type { Show } from "@/models";
import { ref, type Ref } from "vue";

let { getShows, deleteShow } = useDatabase();

let headers: string[];
let shows: Ref<Show[]>;
let addModalDialog = ref(false);
let error = ref(false);

try {
  let showsRes = await getShows();
  headers = showsRes.headers;
  shows = ref(showsRes.shows);
} catch (err) {
  console.error("error:", err);
  error.value = true;
}

const deleteS = async (id: number) => {
  await deleteShow(id);
  let showsRes = await getShows();
  shows.value = showsRes.shows;
};

const openAddModal = () => {
  addModalDialog.value = true;
};
const cancelAddDialog = () => {
  addModalDialog.value = false;
};
</script>
<template>
  <v-container>
    <div v-if="!error">
      <v-btn @click="openAddModal">Add</v-btn>
      <MainTable :headers="headers" :shows="shows" @delete="deleteS" />
      <AddModal :dialog="addModalDialog" @cancel="cancelAddDialog" />
    </div>
    <error-retry v-else />
  </v-container>
</template>
