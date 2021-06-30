import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TeamService} from "../_services/team.service";

@Component({
  selector: 'app-insert-team',
  templateUrl: './insert-team.component.html',
  styleUrls: ['./insert-team.component.css']
})
export class InsertTeamComponent implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private teamService: TeamService) {
    this.form = this.fb.group({
      club_badge_img: null,
      full_name : null,
      name : null,
      abreviated_name: null,
      founding_year: null,
      city: null,
      country: null,
      formation: null
    })
  }

  ngOnInit(): void {
  }

  upload(event: Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    // @ts-ignore
    this.form.get('club_badge_img')?.setValue(file)
  }

  changeName(event: Event){
    // @ts-ignore
    const name = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('name')?.setValue(name)
  }

  changeFullName(event: Event){
    // @ts-ignore
    const full_name = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('full_name')?.setValue(full_name)
  }

  changeAbrName(event: Event){
    // @ts-ignore
    const abreviated_name = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('abreviated_name')?.setValue(abreviated_name)
  }

  changeFoundingYear(event: Event){
    // @ts-ignore
    const founding_year = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('founding_year')?.setValue(founding_year)
  }
  changeCity(event: Event){
    // @ts-ignore
    const city = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('city')?.setValue(city)
  }
  changeCountry(event: Event){
    // @ts-ignore
    const country = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('country')?.setValue(country)
  }
  changeFormation(event: Event){
    // @ts-ignore
    const formation = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('formation')?.setValue(formation)
  }

  insertCompetition(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("club_badge_img", this.form.get('club_badge_img').value);
    // @ts-ignore
    formData.append("full_name", this.form.get('full_name').value);
    // @ts-ignore
    formData.append("name", this.form.get('name').value);
    // @ts-ignore
    formData.append("abreviated_name", this.form.get('abreviated_name').value);
    // @ts-ignore
    formData.append("founding_year", this.form.get('founding_year').value);
    // @ts-ignore
    formData.append("city", this.form.get('city').value);
    // @ts-ignore
    formData.append("country", this.form.get('country').value);
    // @ts-ignore
    formData.append("formation", this.form.get('formation').value);

    this.teamService.insertTeam(formData).subscribe(a => a)
  }
}
