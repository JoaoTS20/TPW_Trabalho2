export class Player {
  full_name: string;
  name: string;
  birthday: Date;
  height: number;
  nationality: string;
  position: string;
  best_foot: string;
  preferred_number: number;
  player_img: string;
  constructor(full_name: string,
              name: string,
              birthday: Date,
              height: number,
              nationality: string,
              position: string,
              best_foot: string,
              preferred_number: number,
              player_img: string) {
    this.full_name = full_name;
    this.name = name;
    this.birthday = birthday;
    this.height = height;
    this.nationality = nationality;
    this.position = position;
    this.best_foot = best_foot;
    this.preferred_number = preferred_number;
    this.player_img = player_img;
  }
}
