import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { store } from '../store/store';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getFavoriteRepo() {
    const favorites = await this.favoriteRepository.find();

    if (favorites.length === 0) {
      return await this.favoriteRepository.save(new Favorite());
    }

    return favorites[0];
  }
  async getFavorites() {
    const favorite = await this.getFavoriteRepo();
    const favTracks = await favorite.tracks.map((id) => {
      return this.trackRepository.findOneBy({ id });
    });

    const favAlbums = await favorite.albums.map((id) => {
      return this.albumRepository.findOneBy({ id });
    });

    const favArtists = await favorite.artists.map((id) => {
      return this.artistRepository.findOneBy({ id });
    });

    const tracks = await Promise.all(favTracks);
    const albums = await Promise.all(favAlbums);
    const artists = await Promise.all(favArtists);

    return {
      tracks: tracks.filter((o) => o),
      albums: albums.filter((o) => o),
      artists: artists.filter((o) => o),
    };
  }

  async createFavoriteTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    const favorite = await this.getFavoriteRepo();

    if (!track) {
      throw new UnprocessableEntityException('track not found');
    }

    favorite.tracks.push(id);

    return this.favoriteRepository.save(favorite);
  }

  async createFavoriteAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    const favorite = await this.getFavoriteRepo();

    if (!album) {
      throw new UnprocessableEntityException('album not found');
    }

    favorite.albums.push(id);

    return this.favoriteRepository.save(favorite);
  }

  async createFavoriteArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    const favorite = await this.getFavoriteRepo();

    if (!artist) {
      throw new UnprocessableEntityException('artist not found');
    }

    favorite.artists.push(id);

    return this.favoriteRepository.save(favorite);
  }

  async deleteFavoriteTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    const favorite = await this.getFavoriteRepo();

    if (!track) {
      throw new UnprocessableEntityException('track not found');
    }

    favorite.tracks = favorite.tracks.filter((track) => track !== id);

    return this.favoriteRepository.save(favorite);
  }

  async deleteFavoriteAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    const favorite = await this.getFavoriteRepo();

    if (!album) {
      throw new UnprocessableEntityException('album not found');
    }

    favorite.albums = favorite.albums.filter((album) => album !== id);

    return this.favoriteRepository.save(favorite);
  }

  async deleteFavoriteArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    const favorite = await this.getFavoriteRepo();

    if (!artist) {
      throw new UnprocessableEntityException('artist not found');
    }

    favorite.artists = favorite.artists.filter((artist) => artist !== id);

    return this.favoriteRepository.save(favorite);
  }
}
