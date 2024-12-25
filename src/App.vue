<script setup lang="ts">
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.loading">
    <router-view />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    Loading...
  </div>
</template>