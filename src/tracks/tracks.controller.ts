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
import { TracksService } from './tracks.service';
import { idDto } from '../id.dto';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get('/:id')
  getTrack(@Param() { id }: idDto) {
    return this.tracksService.getTrack(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() body: CreateTrackDto) {
    return this.tracksService.createTrack(body);
  }

  @Put('/:id')
  updateTrack(@Body() body: UpdateTrackDto, @Param() { id }: idDto) {
    return this.tracksService.updateTrack(body, id);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param() { id }: idDto) {
    return this.tracksService.deleteTrack(id);
  }
}
