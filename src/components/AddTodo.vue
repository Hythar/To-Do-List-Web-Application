<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '../stores/todos';

const todosStore = useTodosStore();

const title = ref('');
const description = ref('');
const category = ref('personal');
const deadline = ref('');

const addTodo = async () => {
  if (!title.value.trim()) return;

  await todosStore.addTodo({
    title: title.value,
    description: description.value,
    category: category.value,
    deadline: deadline.value,
    completed: false
  });

  title.value = '';
  description.value = '';
  category.value = 'personal';
  deadline.value = '';
};
</script>

<template>
  <form @submit.prevent="addTodo" class="space-y-4 bg-white p-6 rounded-lg shadow">
    <div>
      <input
        v-model="title"
        type="text"
        placeholder="What needs to be done?"
        class="w-full p-2 border rounded"
        required
      />
    </div>
    <div>
      <textarea
        v-model="description"
        placeholder="Add description (optional)"
        class="w-full p-2 border rounded"
      ></textarea>
    </div>
    <div class="flex gap-4">
      <select v-model="category" class="p-2 border rounded">
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="shopping">Shopping</option>
      </select>
      <input
        v-model="deadline"
        type="datetime-local"
        class="p-2 border rounded"
      />
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
    >
      Add Todo
    </button>
  </form>
</template>