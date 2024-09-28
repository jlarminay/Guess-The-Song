import { defineStore } from 'pinia';
import { SpotifyApi } from '@/lib/spotifyApi';
const env = import.meta.env;

export default defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('spotifyToken') || null,
    profile: null,
  }),
  actions: {
    login() {
      const clientId = env.VITE_SPOTIFY_CLIENT_ID;
      const redirectUri = env.VITE_REDIRECT_URI;
      const scopes = env.VITE_SPOTIFY_SCOPES;
      const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

      window.location.href = authUrl;
    },
    logout() {
      this.clearToken();
      window.location.href = '/';
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('spotifyToken', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('spotifyToken');
    },
    isLoggedIn() {
      return !!this.token;
    },

    async getProfile() {
      const response = await SpotifyApi.getProfile();
      this.profile = response;
    },
  },
});
