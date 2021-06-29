import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from "../team.service";
import {Team} from "../team";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-oneteam',
  templateUrl: './oneteam.component.html',
  styleUrls: ['./oneteam.component.css']
})
export class OneteamComponent implements OnInit {

  @Input() team: Team | undefined;
  baseURL = 'http://localhost:8000';

  constructor(
    private route: ActivatedRoute,
    private teamservice: TeamService) { }

  ngOnInit(): void {
    this.getTeam()
  }
  getTeam() {
    // @ts-ignore
    const id =+this.route.snapshot.paramMap.get('id');
    this.teamservice.getTeam(id).subscribe(team => this.team = team)
  }
}
