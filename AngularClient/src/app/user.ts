export class User {
  id: number;
  username: string;
  data_joined: Date;
  constructor(id: number, username: string, data_joined: Date) {
    this.id = id;
    this.username=username;
    this.data_joined = data_joined;
  }

}
