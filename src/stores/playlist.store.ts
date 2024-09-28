import { defineStore } from 'pinia';
import { SpotifyApi } from '@/lib/spotifyApi';

type Playlist = {
  name: string;
  id: string;
  image: string;
  total: number;
};

export default defineStore('playlistStore', {
  state: () => ({
    playlists: [] as Array<Playlist>,
    selectedPlaylistId: null as Playlist | null,
    playlistSongs: [] as Array<Playlist>,
  }),

  actions: {
    async fetchPlaylists() {
      const likedSongsCount = await SpotifyApi.getLikedSongsCount();
      const likedSongs = {
        name: 'Liked Songs',
        id: 'liked_songs',
        image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
        total: likedSongsCount,
      };

      const response = await SpotifyApi.getUserPlaylists();
      this.playlists = [
        likedSongs,
        ...response.items
          .filter((playlist: any) => playlist.name !== 'DJ')
          .map((playlist: any) => ({
            name: playlist.name,
            id: playlist.id,
            image: playlist.images[0]?.url || '',
            total: playlist.tracks.total,
          })),
      ];
    },

    // async fetchSongsForPlaylist(playlistId: string) {
    //   if (playlistId === 'liked_songs') {
    //     const response = await SpotifyApi.getLikedSongs();
    //     this.playlistSongs = response.items.map((song: any) => ({
    //       name: song.track.name,
    //       artist: song.track.artists[0].name,
    //       id: song.track.id,
    //     }));
    //   } else {
    //     const response = await SpotifyApi.getPlaylistTracks(playlistId);
    //     this.playlistSongs = response.items.map((song: any) => ({
    //       name: song.track.name,
    //       artist: song.track.artists[0].name,
    //       id: song.track.id,
    //     }));
    //   }
    // },
  },
});
