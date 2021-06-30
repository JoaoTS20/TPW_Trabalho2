import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentCompetition} from "../comment-competition";
import {Competition} from "../competition";
import {CompetitionService} from "../_services/competition.service";
import {Table} from "../table";

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
  baseURL = 'http://localhost:8000';
  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.getCompetition();
    this.getComments();
    this.getTable("2020-2021")
    this.getMatches("2020-2021")

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



}





