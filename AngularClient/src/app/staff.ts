export class Staff {
  id: number;
  full_name: string;
  name: string;
  birthday: Date;
  nationality: string;
  a: string;
  staff_img: string;
  constructor(id: number,
              full_name: string,
              name: string,
              birthday: Date,
              height: number,
              nationality: string,
              a: string,
              staff_img: string) {
    this.id = id;
    this.full_name = full_name;
    this.name = name;
    this.birthday = birthday;
    this.nationality = nationality;
    this.a = a;
    this.staff_img = staff_img;
  }
}
