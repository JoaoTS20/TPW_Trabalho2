import { Component, OnInit } from '@angular/core';
import {Team} from "../_classes/team";
import {Player} from "../_classes/player";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PlayerService} from "../_services/player.service";
import {TeamService} from "../_services/team.service";
import {Staff} from "../_classes/staff";
import {StaffService} from "../_services/staff.service";

@Component({
  selector: 'app-add-staff-team',
  templateUrl: './add-staff-team.component.html',
  styleUrls: ['./add-staff-team.component.css']
})
export class AddStaffTeamComponent implements OnInit {
  team: Team | undefined;
  allstaff: Staff[] | undefined
  form: FormGroup

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              private staffService: StaffService,
              private teamService: TeamService) {

    this.form = this.fb.group({
      staffid: '1',
      season: '2020-2021'
    })
  }



  ngOnInit(): void {
    this.getTeam()

  }

  getTeam(){
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamService.getTeam(id).subscribe(team => {
      this.team = team
    })
    this.staffService.getStaff().subscribe(staff => this.allstaff= staff)
  }

  changeStaff(event: Event){
    // @ts-ignore
    const staffid = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('staffid')?.setValue(staffid)
  }
  changeSeason(event: Event){
    // @ts-ignore
    const season = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('season')?.setValue(season)
  }

  insertStaffInTeam(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("staffid", this.form.get('staffid').value);
    // @ts-ignore
    formData.append("season", this.form.get('season').value);

    // @ts-ignore
    this.teamService.addStafftoTeam(this.team.id,formData).subscribe(a => a)
  }
}
