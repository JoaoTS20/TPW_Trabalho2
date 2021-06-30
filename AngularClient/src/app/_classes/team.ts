import {Player} from "./player";

export class Team{
  id: number;
  full_name: string;
  name:string;
  abreviated_name:string;
  founding_year: number;
  club_badge_img:string;
  city:string;
  country:string;
  players:Player[];
  formation:string;
  constructor(id: number,
              full_name: string,
              name:string,
              abreviated_name:string,
              founding_year: number,
              club_badge_img:string,
              city:string,
              country:string,
              players:Player[],
              formation:string)
  {
      this.id = id;
      this.full_name = full_name;
      this.name = name;
      this.abreviated_name = abreviated_name;
      this.founding_year = founding_year;
      this.club_badge_img = club_badge_img;
      this.city = city;
      this.country = country;
      this.players = players;
      this.formation = formation;
  }

}
