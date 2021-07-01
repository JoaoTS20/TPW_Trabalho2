import { Component, OnInit } from '@angular/core';
import {Player} from "../_classes/player";
import {PlayerService} from "../_services/player.service";
import {Competition} from "../_classes/competition";
import {CompetitionService} from "../_services/competition.service";
import {GlobalConstants} from "../_classes/globalconstants";

@Component({
  selector: 'app-all-competitions',
  templateUrl: './all-competitions.component.html',
  styleUrls: ['./all-competitions.component.css']
})
export class AllCompetitionsComponent implements OnInit {

  competitions: Competition[] | undefined;
  baseURL = GlobalConstants.baseurl;
  name="";
  constructor(private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.getCompetitions(this.name);
  }
  getCompetitions(name: any): void{
    this.competitionService.getCompetitionsSearch(name).subscribe(competitions => this.competitions=competitions)
  }
  search() {
    this.getCompetitions(this.name);
  }

}
