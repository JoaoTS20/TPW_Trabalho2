import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from "../_services/team.service";
import {Team} from "../team";
import {ActivatedRoute} from "@angular/router";
import {PlayersTeam} from "../players-team";
import {Player} from "../player";
import {StaffTeam} from "../staff-team";
import {CommentTeam} from "../comment-team";

@Component({
  selector: 'app-oneteam',
  templateUrl: './oneteam.component.html',
  styleUrls: ['./oneteam.component.css']
})
export class OneteamComponent implements OnInit {

  @Input() team: Team | undefined;
  baseURL = 'http://localhost:8000';
  players: PlayersTeam[] | undefined;
  staffs: any[] | undefined;
  competitions: any[] | undefined;
  comments: CommentTeam[] | undefined;
  seasons: any[] | undefined;


  constructor(
    private route: ActivatedRoute,
    private teamservice: TeamService) { }
  selectedSeason: any;
  ngOnInit(): void {
    this.getTeam()
    this.getPlayersSeason('2020-2021')
    this.getStaffSeason('2020-2021')
    this.getCompetitionsSeason('2020-2021')
    this.getComments();
    this.getSeasons();
  }
  getTeam() {
    // @ts-ignore
    const id =+this.route.snapshot.paramMap.get('id');
    this.teamservice.getTeam(id).subscribe(team => this.team = team)

  }
  getPlayers(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.teamservice.getTeamPlayers(id,season).subscribe(players =>this.players=players)
  }
  getPlayersSeason(season: string): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.teamservice.getTeamPlayers(id,season).subscribe(players =>this.players=players)
  }
  getStaffSeason(season: string): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.teamservice.getTeamStaff(id,season).subscribe(staffs =>this.staffs=staffs)
  }

  //Competitions
  getCompetitionsSeason(season: string): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.teamservice.getTeamCompetition(id,season).subscribe(competitions =>this.competitions=competitions)
  }

  //CHANGE
  getselectedseason(season: string): void{
    this.getPlayersSeason(season)
    this.getStaffSeason(season)
    this.getCompetitionsSeason(season)
  }


  //Comments
  getComments(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamservice.getTeamComments(id).subscribe(comments => this.comments=comments);
  }

  //seasons
  getSeasons(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamservice.getTeamSeasons(id).subscribe(seasons => this.seasons=seasons);
  }

}
