<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore, usePlaylistStore, useSongStore } from '@/stores';

const authStore = useAuthStore();
const playlistStore = usePlaylistStore();
const songStore = useSongStore();

const props = defineProps<{
  playlistId: string;
}>();

onMounted(() => {
  if (!authStore.isLoggedIn()) {
    return;
  }

  authStore.getProfile();
  songStore.getRandomSong(props.playlistId);
});
</script>

<template>
  <div class="tw_h-full tw_bg-dark">
    <div class="tw_flex tw_flex-col tw_p-6 tw_h-full">
      <h1 class="tw_text-xl tw_text-white">Guess the Song</h1>

      <pre>{{ playlistId }}</pre>
      <pre>{{ songStore.selectedSong }}</pre>

      <q-btn
        no-caps
        unelevated
        label="Back"
        class="tw_bg-[#179443] tw_text-white"
        to="/dashboard"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
