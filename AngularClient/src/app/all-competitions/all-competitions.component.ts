import { Component, OnInit } from '@angular/core';
import {Player} from "../player";
import {PlayerService} from "../_services/player.service";
import {Competition} from "../competition";
import {CompetitionService} from "../_services/competition.service";

@Component({
  selector: 'app-all-competitions',
  templateUrl: './all-competitions.component.html',
  styleUrls: ['./all-competitions.component.css']
})
export class AllCompetitionsComponent implements OnInit {

  competitions: Competition[] | undefined;
  baseURL = 'http://localhost:8000';

  constructor(private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.getCompetitions();
  }
  getCompetitions(): void{
    this.competitionService.getCompetitions().subscribe(competitions => this.competitions=competitions)
  }

}
