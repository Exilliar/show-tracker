<script setup lang="ts">
import type { Show } from "@/models";

interface Props {
  headers: string[];
  shows: Show[];
}

const { headers, shows } = defineProps<Props>();

interface Emits {
  (e: "delete", id: number): void;
}

const emit = defineEmits<Emits>();
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left" v-for="header in headers" :key="header">
          {{ header }}
        </th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="show in shows" :key="show.id">
        <td>
          {{ show.title }}
        </td>
        <td>
          {{ new Date(show.datestarted.split("T")[0]).toDateString() }}
        </td>
        <td>
          {{ show.watchevery }}
        </td>
        <td>
          {{ show.catchup }}
        </td>
        <td>
          {{ show.watched }}
        </td>
        <td>
          {{ show.totaleps }}
        </td>
        <td>
          <v-icon large color="blue-lighten-2" v-if="show.uptodate">
            mdi-thumb-up
          </v-icon>
          <v-icon large color="red-lighten-2" v-else> mdi-thumb-down </v-icon>
        </td>
        <td>
          <v-btn plain @click="emit('delete', show.id)">
            Delete
            <v-icon right color="red"> mdi-close </v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
