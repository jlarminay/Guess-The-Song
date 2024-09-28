<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore, usePlaylistStore, useSongStore } from '@/stores';

const authStore = useAuthStore();
const playlistStore = usePlaylistStore();
const songStore = useSongStore();

onMounted(() => {
  if (!authStore.isLoggedIn()) {
    return;
  }

  authStore.getProfile();
  songStore.selectedSong = null;
  playlistStore.fetchPlaylists();
});
</script>

<template>
  <div class="tw_h-full tw_bg-dark">
    <div class="tw_flex tw_flex-col tw_p-6 tw_h-full">
      <div class="tw_flex tw_gap-4 tw_items-center tw_justify-start">
        <div class="tw_w-8 tw_h-8 tw_rounded-full tw_overflow-hidden">
          <img
            :src="authStore.profile?.images[1].url"
            alt="Profile Picture"
            class="tw_w-full tw_h-full"
          />
        </div>
        <h1 class="tw_text-xl tw_text-white">Welcome {{ authStore.profile?.display_name }}</h1>
      </div>

      <div class="tw_flex tw_flex-wrap tw_mt-8">
        <RouterLink
          v-for="(playlist, i) in playlistStore.playlists"
          :key="playlist.id"
          class="tw_w-1/3 tw_p-2"
          :to="`/guess/${playlist.id}`"
        >
          <div class="tw_aspect-square tw_w-full tw_rounded-lg tw_overflow-hidden">
            <img
              :src="playlist.image"
              alt="Playlist Image"
              class="tw_object-cover tw_w-full tw_h-full"
            />
          </div>
          <p class="tw_leading-tight tw_truncate tw_text-white tw_text-sm tw_p-1">
            {{ playlist.total }} {{ playlist.name }}
          </p>
        </RouterLink>
      </div>

      <q-btn
        no-caps
        unelevated
        label="Logout"
        class="tw_bg-[#179443] tw_text-white"
        @click="authStore.logout()"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
