import {Team} from "./team";

export class TableItem {
  team: Team;
  points: number;
  home_goal: number;
  away_goal: number;
  home_concede: number;
  away_concede: number;
  win: number;
  draw: number;
  loss: number;


  constructor(team: Team, points: number, home_goal: number, away_goal: number, home_concede: number, away_concede: number, win: number, draw: number, loss: number) {
    this.team = team;
    this.points = points;
    this.home_goal = home_goal;
    this.away_goal = away_goal;
    this.home_concede = home_concede;
    this.away_concede = away_concede;
    this.win = win;
    this.draw = draw;
    this.loss = loss;
  }
}
