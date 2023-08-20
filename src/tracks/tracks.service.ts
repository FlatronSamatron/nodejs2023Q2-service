import { Injectable, NotFoundException } from '@nestjs/common';
import { store } from '../store/store';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  constructor(@InjectRepository(Track) private repo: Repository<Track>) {}
  getAllTracks() {
    return this.repo.find();
  }

  async getTrack(id: string) {
    const track = await this.repo.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return track;
  }

  createTrack(body: CreateTrackDto) {
    const track = this.repo.create({
      id: uuidv4(),
      ...body,
    });
    return this.repo.save(track);
  }

  async updateTrack(body: UpdateTrackDto, id: string) {
    const track = await this.repo.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return this.repo.save({ ...track, ...body });
  }

  async deleteTrack(id: string) {
    const track = await this.repo.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return this.repo.remove(track);
  }
}
