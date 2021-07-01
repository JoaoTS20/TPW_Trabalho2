import { Component, OnInit } from '@angular/core';
import {Team} from "../_classes/team";
import {TeamService} from "../_services/team.service";
import {GlobalConstants} from "../_classes/globalconstants";

@Component({
  selector: 'app-allteams',
  templateUrl: './allteams.component.html',
  styleUrls: ['./allteams.component.css']
})
export class AllteamsComponent implements OnInit {

  teams: Team[] | undefined;
  baseURL = GlobalConstants.baseurl;


  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeams();
  }
  getTeams(): void{
    this.teamService.getTeams().subscribe(teams => this.teams=teams)
  }

}
