import { Component, OnInit } from '@angular/core';
import {Competition} from "../_classes/competition";
import {CompetitionService} from "../_services/competition.service";
import {Staff} from "../_classes/staff";
import {StaffService} from "../_services/staff.service";

@Component({
  selector: 'app-all-staff',
  templateUrl: './all-staff.component.html',
  styleUrls: ['./all-staff.component.css']
})
export class AllStaffComponent implements OnInit {

  staffs: Staff[] | undefined;
  baseURL = 'http://localhost:8000';

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.getStaff();
  }
  getStaff(): void{
    this.staffService.getStaff().subscribe(staffs => this.staffs=staffs)
  }

}
