import {User} from "./user";

export class NormalUser {
  id: number;
  user: User;
  job_football_related: Boolean;
  favouriteplayers: number[];
  favouriteteams: number[];
  favouritecompetitions: number[];

  constructor(id: number, user: User, job_football_related: Boolean, favouriteplayers: number[], favouriteteams: number[], favouritecompetitions: number[]) {
    this.id = id;
    this.user = user;
    this.job_football_related = job_football_related;
    this.favouriteplayers = favouriteplayers;
    this.favouriteteams = favouriteteams;
    this.favouritecompetitions = favouritecompetitions;
  }
}
