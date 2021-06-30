import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentCompetition} from "../_classes/comment-competition";
import {Competition} from "../_classes/competition";
import {CompetitionService} from "../_services/competition.service";
import {Table} from "../_classes/table";

@Component({
  selector: 'app-one-competition',
  templateUrl: './one-competition.component.html',
  styleUrls: ['./one-competition.component.css']
})
export class OneCompetitionComponent implements OnInit {
  @Input() competition: Competition | undefined;
  comments: CommentCompetition[] | undefined;
  table: Table | undefined;
  matches: any[] | undefined;
  user: string | null | undefined;
  userID: string | null | undefined;
  seasons: any[] | undefined;
  season="2020-2021"

  baseURL = 'http://localhost:8000';
  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    this.getCompetition();
    this.getComments();
    this.getTable(this.season)
    this.getMatches(this.season)
    this.getSeasons();

  }
  getCompetition(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getSelectedCompetition(id).subscribe(competition => this.competition = competition);
  }
  getComments(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getCommentsCompetitions(id).subscribe(comments => this.comments=comments);
  }
  getTable(season: string): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getTableCompetitions(id,season).subscribe(table => this.table=table);

  }
  getMatches(season: string): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getMatchesCompetitions(id,season).subscribe(matches => this.matches=matches);
  }

  getSeasons(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getSeasons(id).subscribe(seasons => this.seasons=seasons);
  }


  getselectedseason() {
    this.getTable(this.season)
    this.getMatches(this.season)
  }
}





