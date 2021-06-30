import {User} from "./user";
import {Player} from "./_classes/player";
import {Team} from "./_classes/team";
import {Competition} from "./_classes/competition";

export class NormalUser {
  id: number;
  user: User;
  job_football_related: Boolean;
  favouriteplayers: Player[];
  favouriteteams: Team[];
  favouritecompetitions: Competition[];

  constructor(id: number, user: User, job_football_related: Boolean, favouriteplayers: Player[], favouriteteams: Team[], favouritecompetitions: Competition[]) {
    this.id = id;
    this.user = user;
    this.job_football_related = job_football_related;
    this.favouriteplayers = favouriteplayers;
    this.favouriteteams = favouriteteams;
    this.favouritecompetitions = favouritecompetitions;
  }
}
