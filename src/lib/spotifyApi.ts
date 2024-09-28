import axios from 'axios';

const API_BASE_URL = 'https://api.spotify.com/v1';
const limit = 50;

export const SpotifyApi = {
  getAccessToken() {
    return localStorage.getItem('spotifyToken');
  },

  getHeaders() {
    const token = this.getAccessToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  },

  async getProfile() {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: this.getHeaders(),
    });
    return response.data;
  },

  async getLikedSongsCount() {
    const response = await axios.get(`${API_BASE_URL}/me/tracks`, {
      headers: this.getHeaders(),
    });
    return response.data.total;
  },

  async getLikedSongs() {
    const response = await axios.get(`${API_BASE_URL}/me/tracks?limit=${limit}`, {
      headers: this.getHeaders(),
    });
    return response.data;
  },

  async getUserPlaylists() {
    const response = await axios.get(`${API_BASE_URL}/me/playlists`, {
      headers: this.getHeaders(),
    });
    return response.data;
  },

  async getPlaylistTrack(playlistId: string, offset: number = 0) {
    if (playlistId === 'liked_songs') {
      const response = await axios.get(`${API_BASE_URL}/me/tracks?limit=1&offset=${offset}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    }

    const response = await axios.get(
      `${API_BASE_URL}/playlists/${playlistId}/tracks?limit=1&offset=${offset}`,
      {
        headers: this.getHeaders(),
      },
    );
    return response.data;
  },
};
