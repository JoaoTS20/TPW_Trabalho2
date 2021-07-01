import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommentCompetition} from "../_classes/comment-competition";
import {Competition} from "../_classes/competition";
import {CompetitionService} from "../_services/competition.service";
import {Table} from "../_classes/table";
import {ProfileService} from "../profile.service";
import {NormalUser} from "../normal-user";

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
  profile: NormalUser[] | undefined;
  baseURL = 'http://localhost:8000';
  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    this.getCompetition();
    this.getComments();
    this.getTable(this.season)
    this.getMatches(this.season)
    this.getSeasons();
    this.getProfile();
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

  getProfile(): void{
    // @ts-ignore
    this.profileService.getProfile(this.userID).subscribe(profile => this.profile = profile);
  }

  getselectedseason() {
    this.getTable(this.season)
    this.getMatches(this.season)
  }

  checkfavourite(id: number){
    // @ts-ignore
    return this.profile[0].favouritecompetitions.find(e => e.id === id);
  }
  deleteCompetition(){
    // @ts-ignore
    this.competitionService.deleteCompetition(this.competition.id).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/competitions']).then(() => {
        window.location.reload();
      }),
      error => error)
  }
}





