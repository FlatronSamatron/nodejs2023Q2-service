import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { idDto } from '../id.dto';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get('/:id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.createArtist(body.name, body.grammy);
  }

  @Put('/:id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, body.name, body.grammy);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
