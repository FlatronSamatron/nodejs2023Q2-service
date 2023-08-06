import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Track } from '../tracks/track.entity';
import { Album } from '../albums/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist, { onDelete: 'CASCADE' })
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist, { onDelete: 'CASCADE' })
  albums: Album[];
}
