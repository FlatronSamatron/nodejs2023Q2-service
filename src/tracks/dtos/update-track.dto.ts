import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  @ValidateIf((o, value) => value !== null)
  artistId: string | null;

  @IsNotEmpty()
  @IsUUID('4')
  @ValidateIf((o, value) => value !== null)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
