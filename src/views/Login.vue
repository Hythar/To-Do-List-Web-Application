<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const error = ref('');

const handleSubmit = async () => {
  try {
    if (isSignUp.value) {
      await authStore.signUp(email.value, password.value);
    } else {
      await authStore.signIn(email.value, password.value);
    }
    router.push('/');
  } catch (e) {
    error.value = e.message;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <h2 class="text-3xl font-bold text-center">
        {{ isSignUp ? 'Create Account' : 'Sign In' }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <input
            v-model="email"
            type="email"
            required
            class="w-full p-2 border rounded"
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-2 border rounded"
            placeholder="Password"
          />
        </div>
        
        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {{ isSignUp ? 'Sign Up' : 'Sign In' }}
        </button>
      </form>

      <div class="text-center">
        <button
          @click="isSignUp = !isSignUp"
          class="text-blue-600 hover:underline"
        >
          {{ isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up' }}
        </button>
      </div>
    </div>
  </div>
</template>