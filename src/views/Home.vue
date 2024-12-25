<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useTodosStore } from '../stores/todos';
import AddTodo from '../components/AddTodo.vue';
import TodoItem from '../components/TodoItem.vue';

const router = useRouter();
const authStore = useAuthStore();
const todosStore = useTodosStore();

onMounted(async () => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  await todosStore.fetchTodos();
});

const handleSignOut = async () => {
  await authStore.signOut();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-3xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">My Todo List</h1>
        <button
          @click="handleSignOut"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      <AddTodo class="mb-8" />

      <div v-if="todosStore.loading" class="text-center py-4">
        Loading...
      </div>
      
      <div v-else class="space-y-4">
        <TodoItem
          v-for="todo in todosStore.todos"
          :key="todo.id"
          :todo="todo"
        />
      </div>
    </div>
  </div>
</template>