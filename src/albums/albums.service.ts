import { Injectable, NotFoundException } from '@nestjs/common';
import { store } from '../store/store';
import { CreaateAlbumDto } from './dtos/creaate-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Injectable()
export class AlbumsService {
  getAllAlbums() {
    return store.albums.find();
  }

  getAlbum(id: string) {
    const album = store.albums.findOneBy(id);

    if (!album) {
      throw new NotFoundException('album not found');
    }

    return album;
  }

  createAlbum(album: CreaateAlbumDto) {
    return store.albums.create(album);
  }

  updateAlbum(body: UpdateAlbumDto, id: string) {
    const album = store.albums.findOneBy(id);

    if (!album) {
      throw new NotFoundException('album not found');
    }

    return store.albums.update(body, id, album);
  }

  deleteAlbum(id: string) {
    const album = store.albums.findOneBy(id);

    if (!album) {
      throw new NotFoundException('album not found');
    }

    return store.albums.delete(id);
  }
}
