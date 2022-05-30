<script setup lang="ts">
import type { ShowAdd } from "@/models";
import { ref, type Ref } from "vue";

interface Props {
  dialog: boolean;
}
let { dialog } = defineProps<Props>();

interface Emits {
  (e: "cancel"): void;
  (e: "submit", showAdd: ShowAdd): void;
}

let emit = defineEmits<Emits>();

let showAdd: Ref<ShowAdd> = ref({
  title: "",
  watchevery: 0,
  catchup: 0,
  watched: 0,
  uptodate: false,
  totaleps: 0,
  datestarted: "",
});

const rules = [(s: string) => s === "hello" || "invalid"];

const form = ref<any>(null);

const submit = async () => {
    // console.log("validate:", await form.value.validate());
  console.log("submit:", showAdd);
};

let valid = false;
</script>
<template>
  <v-dialog v-model="dialog">
    <v-card style="width: '50%'">
      <v-form v-model="valid" @submit.prevent="submit" ref="form">
        <v-card-header>Add</v-card-header>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="showAdd.title"
                label="Title"
                required
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="showAdd.watchevery"
                label="Watch every"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="showAdd.catchup"
                label="Catch up"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="showAdd.watched"
                label="Watched"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="showAdd.uptodate"
                label="Up to date?"
                type="number"
                required
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="showAdd.totaleps"
                label="Total eps"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="showAdd.datestarted"
                label="Date started"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="emit('cancel')">Cancel</v-btn>
          <v-btn type="submit">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
