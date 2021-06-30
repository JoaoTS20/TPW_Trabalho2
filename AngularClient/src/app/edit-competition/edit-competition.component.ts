import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompetitionService} from "../_services/competition.service";
import {Competition} from "../_classes/competition";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html',
  styleUrls: ['./edit-competition.component.css']
})
export class EditCompetitionComponent implements OnInit {
  form: FormGroup;
  @Input() competition: Competition | undefined;
  constructor(
    private route: ActivatedRoute,
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
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getSelectedCompetition(id).subscribe(comp => {
      this.form.patchValue({
        full_name:comp.full_name,
        region:comp.region,
                                  });
      this.form.updateValueAndValidity()
      this.competition = comp
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

    // @ts-ignore
    this.form.get('full_name')?.setValue(full_name)
  }

  changeRegion(event: Event){
    // @ts-ignore
    const region = (event.target as HTMLInputElement).value;

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

    // @ts-ignore
    this.competitionService.editCompetition(this.competition.id,formData).subscribe(a => a)
  }
}
