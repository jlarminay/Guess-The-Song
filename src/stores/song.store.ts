import { defineStore } from 'pinia';
import { SpotifyApi } from '@/lib/spotifyApi';
import usePlaylistStore from './playlist.store';

type Song = {
  name: string;
  artist: string;
  id: string;
  duration: number;
  image: string;
};

export default defineStore('songStore', {
  state: () => ({
    selectedSong: null as Song | null,
    playlistSongs: [] as Array<Song>,
    filteredSongs: [] as Array<Song>,
  }),

  actions: {
    async getRandomSong(playlistId: string) {
      const playlistStore = usePlaylistStore();
      const maxLength =
        playlistStore.playlists.find((playlist) => playlist.id === playlistId)?.total || 0;

      const randomIndex = Math.floor(Math.random() * maxLength);
      const response = await SpotifyApi.getPlaylistTrack(playlistId, randomIndex);
      console.log(response);
      this.selectedSong = {
        name: response.items[0].track.name,
        artist: response.items[0].track.artists[0].name,
        id: response.items[0].track.id,
        duration: response.items[0].track.duration_ms,
        image: response.items[0].track.album.images[0].url,
      };
    },
  },
});
