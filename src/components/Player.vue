<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores'; // Import Pinia store for authentication

// Store the player instance and device ID
const playerInstance = ref<any>(null);
const deviceId = ref<string | null>(null);

// Access the auth store
const authStore = useAuthStore();

// Initialize the Spotify Player
const initializePlayer = (token: string) => {
  const player = new Spotify.Player({
    name: 'My Spotify Web Player',
    getOAuthToken: (cb) => {
      cb(token);
    }, // OAuth token from Pinia store
  });

  // When player is ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Player ready with Device ID:', device_id);
    deviceId.value = device_id; // Save device ID
    playerInstance.value = player; // Save player instance
  });

  // Player not ready event
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  player.connect(); // Connect the player
};

// Load the Spotify Web Playback SDK dynamically
const loadSpotifySdk = () => {
  return new Promise<void>((resolve) => {
    if (window.Spotify) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

// Play the first 5 seconds of a song
const playSong = async () => {
  const spotifyUri = 'spotify:track:1EYWV10y73hMVkILjZgk2Z'; // Replace with a real track ID
  const token = authStore.token; // Get the OAuth token from Pinia store

  // Make sure device ID is available
  if (deviceId.value) {
    // Send request to Spotify Web API to start playing the song
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId.value}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [spotifyUri] }),
    });

    // Pause playback after 5 seconds
    setTimeout(() => {
      fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId.value}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }, 5000); // Stop after 5 seconds
  } else {
    console.error('Player device is not ready yet.');
  }
};

// Load the SDK and initialize the player when the component is mounted
onMounted(async () => {
  if (!authStore.isLoggedIn() || !authStore.token) return;

  window.onSpotifyWebPlaybackSDKReady = () => {
    initializePlayer(authStore.token); // Initialize the player with OAuth token
  };

  await loadSpotifySdk(); // Load the SDK
});
</script>

<template>
  <div class="tw_flex tw_flex-col tw_items-center tw_justify-center">
    <h1 class="tw_text-2xl tw_font-bold tw_mb-4">Play Preview</h1>
    <button
      @click="playSong"
      class="tw_bg-blue-500 tw_text-white tw_px-4 tw_py-2 tw_rounded tw_hover:tw_bg-blue-600"
    >
      Play First 5 Seconds
    </button>
  </div>
</template>

<style scoped lang="postcss"></style>
