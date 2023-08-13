import { Artist } from './types';
import { v4 as uuidv4 } from 'uuid';
import { store } from './store';
export class Artists {
  artists: Artist[] = [];

  constructor() {
    this.artists = [
      {
        id: 'bd15d37e-26a6-4a4c-86b2-7b94ba973d15',
        name: 'artist',
        grammy: true,
      },
    ];
  }

  find() {
    return this.artists;
  }

  findOneBy(id) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(name: string, grammy: boolean) {
    const artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    this.artists = [...this.artists, artist];
    return artist;
  }

  update(id: string, artist: Artist, name: string, grammy: boolean) {
    const newArtist = {
      ...artist,
      name,
      grammy,
    };

    this.artists = this.artists.map((item) => {
      return item.id === id ? newArtist : item;
    });

    return newArtist;
  }

  delete(id: string) {
    store.tracks.deleteArtisId(id);
    store.albums.deleteArtisId(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return null;
  }
}
