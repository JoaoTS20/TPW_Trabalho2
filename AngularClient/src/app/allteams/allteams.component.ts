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
  name="";

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeams(this.name);
  }
  getTeams(name: any): void{
    this.teamService.getTeamsSearch(name).subscribe(teams => this.teams=teams)
  }
  search(){
    this.getTeams(this.name);
  }

}
