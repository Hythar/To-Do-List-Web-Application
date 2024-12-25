<script setup lang="ts">
import { ref } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import type { Todo } from '../types/todo';
import { useTodosStore } from '../stores/todos';
import EditTodoForm from './EditTodoForm.vue';

const props = defineProps<{
  todo: Todo;
}>();

const todosStore = useTodosStore();
const isEditing = ref(false);

const toggleComplete = async () => {
  await todosStore.updateTodo(props.todo.id, {
    completed: !props.todo.completed
  });
};

const deleteTodo = async () => {
  await todosStore.deleteTodo(props.todo.id);
};

const handleSave = async (updates: Partial<Todo>) => {
  await todosStore.updateTodo(props.todo.id, updates);
  isEditing.value = false;
};
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <div v-if="!isEditing">
      <div class="flex items-center gap-4">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleComplete"
          class="w-5 h-5 text-blue-600"
        />
        <div class="flex-1">
          <h3 :class="['text-lg font-medium', todo.completed && 'line-through text-gray-500']">
            {{ todo.title }}
          </h3>
          <p v-if="todo.description" class="text-gray-600">{{ todo.description }}</p>
          <div class="flex gap-2 mt-2">
            <span class="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
              {{ todo.category }}
            </span>
            <span v-if="todo.deadline" class="text-sm text-gray-500">
              Due {{ formatDistanceToNow(new Date(todo.deadline)) }}
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="isEditing = true"
            class="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            Edit
          </button>
          <button
            @click="deleteTodo"
            class="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <EditTodoForm
      v-else
      :todo="todo"
      @save="handleSave"
      @cancel="isEditing = false"
    />
  </div>
</template>