import {Player} from "./player";
import {Staff} from "./staff";

export class StaffTeam {
  id: number;
  staff: Staff;
  team: number;
  season: string;

  constructor(id: number, staff: Staff, team: number, season: string) {
    this.id = id;
    this.staff = staff;
    this.team = team;
    this.season = season;
  }
}
