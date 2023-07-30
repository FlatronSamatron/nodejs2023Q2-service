import { Users } from './users';
import { Artists } from './artists';
import { Tracks } from './tracks';
import { Albums } from './albums';

export const store = {
  users: new Users(),
  artists: new Artists(),
  tracks: new Tracks(),
  albums: new Albums(),
};
