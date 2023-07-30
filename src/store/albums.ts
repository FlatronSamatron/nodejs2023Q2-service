import { Album } from './types';
import { v4 as uuidv4 } from 'uuid';
import { store } from './store';

export class Albums {
  albums: Album[] = [];

  constructor() {
    this.albums = [
      {
        id: 'bd15d37e-26a6-4a4c-86b2-7b94ba973c55',
        name: 'album',
        year: 2015,
        artistId: null,
      },
    ];
  }

  deleteArtisId(id: string) {
    this.albums = this.albums.map((album) => {
      return album.artistId === id ? { ...album, artistId: null } : album;
    });
  }

  find() {
    return this.albums;
  }

  findOneBy(id: string) {
    return this.albums.find((user) => user.id === id);
  }

  create({ name, year, artistId }: Partial<Album>) {
    const newAlbum = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };

    this.albums = [...this.albums, newAlbum];

    return newAlbum;
  }

  update(values: Partial<Album>, id: string, album: Album) {
    const newAlbum = {
      ...album,
      ...values,
    };

    this.albums = this.albums.map((albumItem) => {
      return albumItem.id === id ? newAlbum : albumItem;
    });

    return newAlbum;
  }

  delete(id: string) {
    store.tracks.deleteAlbumId(id);
    this.albums = this.albums.filter((user) => {
      return user.id !== id;
    });

    return null;
  }
}
