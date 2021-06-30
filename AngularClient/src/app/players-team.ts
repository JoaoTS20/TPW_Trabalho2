import {Player} from "./player";

export class PlayersTeam {
  id: number;
  player: Player;
  team: number;
  season: string;

  constructor(id: number, player: Player, team: number, season: string) {
    this.id = id;
    this.player = player;
    this.team = team;
    this.season = season;
  }
}
