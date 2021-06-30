import {NormalUser} from "./normal-user";

export class CommentCompetition {
  id: number;
  competition: number;
  user: NormalUser;
  timeofpost: Date;
  comment: string;
  constructor(id: number, competition: number, user: NormalUser, timeofpost: Date, comment: string) {
    this.id = id;
    this.competition = competition;
    this.user = user;
    this.timeofpost = timeofpost;
    this.comment = comment;
  }
}
