import { defineStore } from 'pinia';
import { ref } from 'vue';
import { firebase } from '../lib/firebase';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(true);

  async function initialize() {
    const { data: { session } } = await firebase.auth.getSession();
    user.value = session?.user ?? null;
    loading.value = false;

    firebase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });
  }

  async function signIn(email: string, password: string) {
    const { error } = await firebase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(email: string, password: string) {
    const { error } = await firebase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await firebase.auth.signOut();
    if (error) throw error;
  }

  return {
    user,
    loading,
    initialize,
    signIn,
    signUp,
    signOut
  };
});