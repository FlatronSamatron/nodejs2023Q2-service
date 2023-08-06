import { Injectable, NotFoundException } from '@nestjs/common';
import { store } from '../store/store';
import { CreaateAlbumDto } from './dtos/creaate-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}
  getAllAlbums() {
    return this.repo.find();
  }

  async getAlbum(id: string) {
    const album = await this.repo.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('album not found');
    }

    return album;
  }

  createAlbum(body: CreaateAlbumDto) {
    const album = this.repo.create({
      id: uuidv4(),
      ...body,
    });
    return this.repo.save(album);
  }

  async updateAlbum(body: UpdateAlbumDto, id: string) {
    const album = await this.repo.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('album not found');
    }

    return this.repo.save({
      ...album,
      ...body,
    });
  }

  async deleteAlbum(id: string) {
    const album = await this.repo.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('album not found');
    }

    return this.repo.remove(album);
  }
}
