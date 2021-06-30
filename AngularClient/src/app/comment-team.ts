import {NormalUser} from "./normal-user";

export class CommentTeam {
  id: number;
  team: number;
  user: NormalUser;
  timeofpost: Date;
  comment: string;
  constructor(id: number, team: number, user: NormalUser, timeofpost: Date, comment: string) {
    this.id = id;
    this.team = team;
    this.user = user;
    this.timeofpost = timeofpost;
    this.comment = comment;
  }
}
