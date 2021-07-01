import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompetitionService} from "../_services/competition.service";
import {StaffService} from "../_services/staff.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insert-staff',
  templateUrl: './insert-staff.component.html',
  styleUrls: ['./insert-staff.component.css']
})
export class InsertStaffComponent implements OnInit {

  form: FormGroup;
  //full_name = '';
  //competition_badge_img:File | undefined;
  //region = '';

  constructor(
    public fb: FormBuilder,
    private staffService: StaffService,
    private router: Router) {
    this.form = this.fb.group({
      staff_img: null,
      full_name : null,
      name : null,
      birthday: null,
      nationality: null,
      funcao: null
    })
  }

  ngOnInit(): void {
  }

  upload(event: Event){

    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    // @ts-ignore
    this.form.get('staff_img')?.setValue(file)

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

  changeBirthday(event: Event){
    // @ts-ignore
    const birthday = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('birthday')?.setValue(birthday)
  }

  changeNationality(event: Event){
    // @ts-ignore
    const nationality = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('nationality')?.setValue(nationality)
  }

  changeFunction(event: Event){
    // @ts-ignore
    const functionf = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('funcao')?.setValue(functionf)
  }

  insertStaff(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("staff_img", this.form.get('staff_img').value);
    // @ts-ignore
    formData.append("full_name", this.form.get('full_name').value);
    // @ts-ignore
    formData.append("name", this.form.get('name').value);
    // @ts-ignore
    formData.append("birthday", this.form.get('birthday').value);
    // @ts-ignore
    formData.append("nationality", this.form.get('nationality').value);
    // @ts-ignore
    formData.append("funcao", this.form.get('funcao').value);

    this.staffService.insertStaff(formData).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/staff']),
      error => error
    )
  }

}
