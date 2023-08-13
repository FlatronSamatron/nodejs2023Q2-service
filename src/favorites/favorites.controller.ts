import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { idDto } from '../id.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  createFavoriteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createFavoriteTrack(id);
  }

  @Post('/album/:id')
  createFavoriteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createFavoriteAlbum(id);
  }

  @Post('/artist/:id')
  createFavoriteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createFavoriteArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteFavoriteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFavoriteTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteFavoriteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteFavoriteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFavoriteArtist(id);
  }
}
