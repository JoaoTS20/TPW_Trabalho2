import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from "../team.service";
import {Team} from "../team";

@Component({
  selector: 'app-oneteam',
  templateUrl: './oneteam.component.html',
  styleUrls: ['./oneteam.component.css']
})
export class OneteamComponent implements OnInit {

  @Input() team: Team | undefined;

  constructor(private teamservice: TeamService) { }

  ngOnInit(): void {
    this.getTeam()
  }
  getTeam() {
    this.teamservice.getTeam(1).subscribe(team => this.team = team)
  }
}
