import { IsUUID } from 'class-validator';

export class idDto {
  @IsUUID('4')
  id: string;
}
