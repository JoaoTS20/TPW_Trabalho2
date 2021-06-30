import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompetitionService} from "../competition.service";

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html',
  styleUrls: ['./edit-competition.component.css']
})
export class EditCompetitionComponent implements OnInit {
  form: FormGroup;
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
    this.getCompetitionToEdit();
  }

  getCompetitionToEdit(){
    this.competitionService.getCompetition(2).subscribe(comp => {
      console.log(this.form.controls)
      this.form.patchValue({
        full_name:comp.full_name,
        region:comp.region,
                                  });
      this.form.updateValueAndValidity()
      console.log(comp.full_name)
    })
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
    console.log(full_name);

    // @ts-ignore
    this.form.get('full_name')?.setValue(full_name)
  }

  changeRegion(event: Event){
    // @ts-ignore
    const region = (event.target as HTMLInputElement).value;
    console.log(region);

    // @ts-ignore
    this.form.get('region')?.setValue(region)
  }

  updateCompetition(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("competition_badge_img", this.form.get('competition_badge_img').value);
    // @ts-ignore
    formData.append("full_name", this.form.get('full_name').value);
    // @ts-ignore
    formData.append("region", this.form.get('region').value);

    //this.competitionService.insertCompetition(formData).subscribe(a => a)
  }
}
