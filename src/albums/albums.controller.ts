import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { idDto } from '../id.dto';
import { CreaateAlbumDto } from './dtos/creaate-album.dto';
import { UpdateTrackDto } from '../tracks/dtos/update-track.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get('/:id')
  getAlbum(@Param() { id }: idDto) {
    return this.albumsService.getAlbum(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() body: CreaateAlbumDto) {
    return this.albumsService.createAlbum(body);
  }

  @Put('/:id')
  updateAlbum(@Body() body: UpdateAlbumDto, @Param() { id }: idDto) {
    return this.albumsService.updateAlbum(body, id);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteAlbum(@Param() { id }: idDto) {
    return this.albumsService.deleteAlbum(id);
  }
}
