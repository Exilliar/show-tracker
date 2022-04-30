<script setup lang="ts">
import { ref } from 'vue';

let count = ref(0);
</script>

<template>
  <p>This is working!</p>
  <p>Count: {{ count }}</p>
  <button @click="count++">inc count</button>
</template>

<style>

</style>
