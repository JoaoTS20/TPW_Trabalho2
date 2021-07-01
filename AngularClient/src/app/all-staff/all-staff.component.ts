import { Component, OnInit } from '@angular/core';
import {Competition} from "../_classes/competition";
import {CompetitionService} from "../_services/competition.service";
import {Staff} from "../_classes/staff";
import {StaffService} from "../_services/staff.service";
import {GlobalConstants} from "../_classes/globalconstants";

@Component({
  selector: 'app-all-staff',
  templateUrl: './all-staff.component.html',
  styleUrls: ['./all-staff.component.css']
})
export class AllStaffComponent implements OnInit {

  staffs: Staff[] | undefined;
  baseURL = GlobalConstants.baseurl;
  name="";
  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.getStaff(this.name);
  }
  getStaff(name: any): void{
    this.staffService.getStaffSearch(name).subscribe(staffs => this.staffs=staffs)
  }

  search(){
    this.getStaff(this.name);
  }

}
