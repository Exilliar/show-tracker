<script setup lang="ts">
import MainTable from "@/components/mainPage/MainTable.vue";
import AddModal from "@/components/mainPage/AddModal.vue";

import { useDatabase } from "@/composables/useDatabase";
import type { Show } from "@/models";
import { ref, type Ref } from "vue";

let { getShows, deleteShow } = useDatabase();

let headers: string[];
let shows: Ref<Show[]>;
let addModalDialog = ref(false);

let showsRes = await getShows();
headers = showsRes.headers;
shows = ref(showsRes.shows);

const deleteS = async (id: number) => {
  await deleteShow(id);
  let showsRes = await getShows();
  shows.value = showsRes.shows;
};

const openAddModal = () => {
  addModalDialog.value = true;
}
const cancelAddDialog = () => {
  addModalDialog.value = false;
}

</script>
<template>
  <v-container>
    <v-btn @click="openAddModal">Add</v-btn>
    <MainTable :headers="headers" :shows="shows" @delete="deleteS" />
    <AddModal :dialog="addModalDialog" @cancel="cancelAddDialog" />
  </v-container>
</template>
