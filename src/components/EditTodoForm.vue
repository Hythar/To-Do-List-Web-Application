<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '../types/todo';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  save: [updates: Partial<Todo>];
  cancel: [];
}>();

const title = ref(props.todo.title);
const description = ref(props.todo.description || '');
const category = ref(props.todo.category);
const deadline = ref(props.todo.deadline || '');

const handleSubmit = () => {
  emit('save', {
    title: title.value,
    description: description.value || null,
    category: category.value,
    deadline: deadline.value || null
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <input
        v-model="title"
        type="text"
        required
        class="w-full p-2 border rounded"
        placeholder="Task title"
      />
    </div>
    <div>
      <textarea
        v-model="description"
        class="w-full p-2 border rounded"
        placeholder="Description (optional)"
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
    <div class="flex gap-2">
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Cancel
      </button>
    </div>
  </form>
</template>