import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-one-staff',
  templateUrl: './one-staff.component.html',
  styleUrls: ['./one-staff.component.css']
})
export class OneStaffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
