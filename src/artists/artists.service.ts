import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(Artist) private repo: Repository<Artist>) {}
  getAllArtists() {
    return this.repo.find();
  }

  async getArtist(id: string) {
    const artist = await this.repo.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return artist;
  }

  createArtist(name: string, grammy: boolean) {
    const artist = this.repo.create({ id: uuidv4(), name, grammy });
    return this.repo.save(artist);
  }

  async updateArtist(id: string, name: string, grammy: boolean) {
    const artist = await this.repo.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return this.repo.save({ id, name, grammy });
  }

  async deleteArtist(id: string) {
    const artist = await this.repo.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return this.repo.remove(artist);
  }
}
