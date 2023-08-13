import { Track } from './types';
import { v4 as uuidv4 } from 'uuid';
export class Tracks {
  tracks: Track[] = [];

  constructor() {
    this.tracks = [
      {
        id: 'bd15d37e-26a6-4a4c-86b2-7b94ba973d55',
        name: 'track',
        artistId: 'bd15d37e-26a6-4a4c-86b2-7b94ba973d15',
        albumId: null,
        duration: 50,
      },
    ];
  }

  deleteAlbumId(id: string) {
    this.tracks = this.tracks.map((track) => {
      return track.albumId === id ? { ...track, albumId: null } : track;
    });
  }

  deleteArtisId(id: string) {
    this.tracks = this.tracks.map((track) => {
      return track.artistId === id ? { ...track, artistId: null } : track;
    });
  }

  find() {
    return this.tracks;
  }

  findOneBy(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  create({ name, artistId, albumId, duration }: Partial<Track>) {
    const newTrack = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks = [...this.tracks, newTrack];

    return newTrack;
  }

  update(values: Partial<Track>, id: string, track: Track) {
    const newTrack = {
      ...track,
      ...values,
    };

    this.tracks = this.tracks.map((itemTrack) => {
      return itemTrack.id === id ? newTrack : itemTrack;
    });

    return newTrack;
  }

  delete(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return null;
  }
}
