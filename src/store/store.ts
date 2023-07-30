import { Users } from './users';
import { Artists } from './artists';
import { Tracks } from './tracks';
import { Albums } from './albums';
import { Favorite } from './favorites';

export const store = {
  users: new Users(),
  artists: new Artists(),
  tracks: new Tracks(),
  albums: new Albums(),
  favorites: new Favorite(),
};
