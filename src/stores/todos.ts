import { defineStore } from 'pinia';
import { ref } from 'vue';
import { firebase } from '../lib/firebase';
import type { Todo } from '../types/todo';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTodos() {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await firebase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      todos.value = data;
    } catch (e) {
      error.value = e.message;
      console.error('Error fetching todos:', e);
    } finally {
      loading.value = false;
    }
  }

  async function addTodo(todo: Omit<Todo, 'id' | 'created_at' | 'user_id'>) {
    try {
      error.value = null;
      const { error: supabaseError } = await firebase
        .from('todos')
        .insert([todo])
        .select()
        .single();

      if (supabaseError) throw supabaseError;
      await fetchTodos();
    } catch (e) {
      error.value = e.message;
      console.error('Error adding todo:', e);
      throw e;
    }
  }

  async function updateTodo(id: string, updates: Partial<Todo>) {
    try {
      error.value = null;
      const { error: supabaseError } = await firebase
        .from('todos')
        .update(updates)
        .eq('id', id);

      if (supabaseError) throw supabaseError;
      await fetchTodos();
    } catch (e) {
      error.value = e.message;
      console.error('Error updating todo:', e);
      throw e;
    }
  }

  async function deleteTodo(id: string) {
    try {
      error.value = null;
      const { error: supabaseError } = await firebase
        .from('todos')
        .delete()
        .eq('id', id);

      if (supabaseError) throw supabaseError;
      await fetchTodos();
    } catch (e) {
      error.value = e.message;
      console.error('Error deleting todo:', e);
      throw e;
    }
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo
  };
});