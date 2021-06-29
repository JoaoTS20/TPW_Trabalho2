import {Team} from "./team";

export class Competition {
  id: number;
  full_name: number;
  competition_badge_img: string;
  teams: Team[];
  region: string;

  constructor(id:number, full_name: number, competition_badge_img: string, teams: Team[], region: string) {
    this.id= id;
    this.full_name = full_name;
    this.competition_badge_img = competition_badge_img;
    this.teams = teams;
    this.region = region;
  }
}
