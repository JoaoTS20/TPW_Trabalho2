import { Component, OnInit } from '@angular/core';
import {CompetitionService} from "../_services/competition.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-insert-competition',
  templateUrl: './insert-competition.component.html',
  styleUrls: ['./insert-competition.component.css']
})
export class InsertCompetitionComponent implements OnInit {

  form: FormGroup;
  //full_name = '';
  //competition_badge_img:File | undefined;
  //region = '';

  constructor(
    public fb: FormBuilder,
    private competitionService: CompetitionService) {
    this.form = this.fb.group({
      competition_badge_img: null,
      full_name : null,
      region : null
    })
  }

  ngOnInit(): void {
  }

  upload(event: Event){

    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    // @ts-ignore
    this.form.get('competition_badge_img')?.setValue(file)

  }

  changeName(event: Event){
    // @ts-ignore
    const full_name = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('full_name')?.setValue(full_name)
  }

  changeRegion(event: Event){
    // @ts-ignore
    const region = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('region')?.setValue(region)
  }

  insertCompetition(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("competition_badge_img", this.form.get('competition_badge_img').value);
    // @ts-ignore
    formData.append("full_name", this.form.get('full_name').value);
    // @ts-ignore
    formData.append("region", this.form.get('region').value);

    this.competitionService.insertCompetition(formData).subscribe(a => a)
  }

}
