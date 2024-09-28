<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

const env = import.meta.env;

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // check if already logged in
  if (authStore.isLoggedIn()) {
    router.push('/dashboard');
    return;
  }

  // check new token
  const hash = window.location.hash;
  const token = new URLSearchParams(hash.substring(1)).get('access_token');
  if (token) {
    authStore.setToken(token);
    router.push('/dashboard');
    return;
  }
});
</script>

<template>
  <div class="tw_flex tw_flex-col tw_h-full tw_p-6 tw_bg-dark">
    <div class="tw_flex-grow tw_py-6">
      <h1 class="tw_text-4xl tw_text-white tw_text-center">Guess The Song</h1>
      <pre>{{ env }}</pre>
    </div>

    <q-btn
      no-caps
      unelevated
      size="lg"
      label="Login with Spotify"
      class="tw_bg-[#179443] tw_text-white"
      @click="authStore.login()"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
