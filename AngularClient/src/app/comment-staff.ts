import {NormalUser} from "./normal-user";

export class CommentStaff {
  id: number;
  staff: number;
  user: NormalUser;
  timeofpost: Date;
  comment: string;
  constructor(id: number, staff: number, user: NormalUser, timeofpost: Date, comment: string) {
    this.id = id;
    this.staff = staff;
    this.user = user;
    this.timeofpost = timeofpost;
    this.comment = comment;
  }
}
