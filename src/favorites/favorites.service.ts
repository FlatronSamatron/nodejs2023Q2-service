import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { store } from '../store/store';

@Injectable()
export class FavoritesService {
  getFavorites() {
    return store.favorites.find();
  }

  createFavoriteTrack(id: string) {
    const track = store.tracks.findOneBy(id);

    if (!track) {
      throw new UnprocessableEntityException('track not found');
    }

    return store.favorites.addTrack(id);
  }

  createFavoriteAlbum(id: string) {
    const album = store.albums.findOneBy(id);

    if (!album) {
      throw new UnprocessableEntityException('album not found');
    }

    return store.favorites.addAlbum(id);
  }

  createFavoriteArtist(id: string) {
    const artist = store.artists.findOneBy(id);

    if (!artist) {
      throw new UnprocessableEntityException('artist not found');
    }

    return store.favorites.addArtist(id);
  }

  deleteFavoriteTrack(id: string) {
    const track = store.tracks.findOneBy(id);

    if (!track) {
      throw new UnprocessableEntityException('track not found');
    }

    return store.favorites.deleteTrack(id);
  }

  deleteFavoriteAlbum(id: string) {
    const album = store.albums.findOneBy(id);

    if (!album) {
      throw new UnprocessableEntityException('album not found');
    }

    return store.favorites.deleteAlbum(id);
  }

  deleteFavoriteArtist(id: string) {
    const artist = store.artists.findOneBy(id);

    if (!artist) {
      throw new UnprocessableEntityException('artist not found');
    }

    return store.favorites.deleteArtist(id);
  }
}
