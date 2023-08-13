import { Injectable, NotFoundException } from '@nestjs/common';
import { store } from '../store/store';

@Injectable()
export class ArtistsService {
  getAllArtists() {
    return store.artists.find();
  }

  getArtist(id: string) {
    const artist = store.artists.findOneBy(id);

    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return artist;
  }

  createArtist(name: string, grammy: boolean) {
    return store.artists.create(name, grammy);
  }

  updateArtist(id: string, name: string, grammy: boolean) {
    const artist = store.artists.findOneBy(id);

    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return store.artists.update(id, artist, name, grammy);
  }

  deleteArtist(id: string) {
    const artist = store.artists.findOneBy(id);

    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return store.artists.delete(id);
  }
}
