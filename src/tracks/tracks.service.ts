import { Injectable, NotFoundException } from '@nestjs/common';
import { store } from '../store/store';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { UpdateAlbumDto } from '../albums/dtos/update-album.dto';

@Injectable()
export class TracksService {
  getAllTracks() {
    return store.tracks.find();
  }

  getTrack(id: string) {
    const track = store.tracks.findOneBy(id);

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return track;
  }

  createTrack(body: CreateTrackDto) {
    return store.tracks.create(body);
  }

  updateTrack(body: UpdateTrackDto, id: string) {
    const track = store.tracks.findOneBy(id);

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return store.tracks.update(body, id, track);
  }

  deleteTrack(id: string) {
    const track = store.tracks.findOneBy(id);

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return store.tracks.delete(id);
  }
}
