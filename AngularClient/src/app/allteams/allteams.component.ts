import { Component, OnInit } from '@angular/core';
import {Team} from "../team";
import {TeamService} from "../team.service";

@Component({
  selector: 'app-allteams',
  templateUrl: './allteams.component.html',
  styleUrls: ['./allteams.component.css']
})
export class AllteamsComponent implements OnInit {

  teams: Team[] | undefined;
  baseURL = 'http://localhost:8000';


  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeams();
  }
  getTeams(): void{
    this.teamService.getTeams().subscribe(teams => this.teams=teams)
  }

}
