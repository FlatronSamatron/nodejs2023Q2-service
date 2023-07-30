import { store } from './store';

export class Favorite {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.artists = ['bd15d37e-26a6-4a4c-86b2-7b94ba973d15'];
    this.albums = ['bd15d37e-26a6-4a4c-86b2-7b94ba973c55'];
    this.tracks = ['bd15d37e-26a6-4a4c-86b2-7b94ba973d55'];
  }

  find() {
    const artists = this.artists
      .map((artist) => store.artists.findOneBy(artist))
      .filter((e) => e);
    const albums = this.albums
      .map((album) => store.albums.findOneBy(album))
      .filter((e) => e);
    const tracks = this.tracks
      .map((track) => store.tracks.findOneBy(track))
      .filter((e) => e);

    return { artists, albums, tracks };
  }

  addArtist(id: string) {
    this.artists = [...this.artists, id];
  }

  addAlbum(id: string) {
    this.albums = [...this.albums, id];
  }

  addTrack(id: string) {
    this.tracks = [...this.tracks, id];
  }

  deleteArtist(id) {
    this.artists = this.artists.filter((artist) => artist !== id);
    return null;
  }

  deleteAlbum(id) {
    this.albums = this.albums.filter((album) => album !== id);
    return null;
  }

  deleteTrack(id) {
    this.tracks = this.tracks.filter((track) => track !== id);
    return null;
  }
}
