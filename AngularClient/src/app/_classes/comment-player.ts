import {NormalUser} from "../normal-user";

export class CommentPlayer {
  id: number;
  player: number;
  user: NormalUser;
  timeofpost: Date;
  comment: string;
  constructor(id: number, player: number, user: NormalUser, timeofpost: Date, comment: string) {
    this.id = id;
    this.player = player;
    this.user = user;
    this.timeofpost = timeofpost;
    this.comment = comment;
  }

}
