import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from "../_services/team.service";
import {Team} from "../_classes/team";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayersTeam} from "../_classes/players-team";
import {Player} from "../_classes/player";
import {StaffTeam} from "../_classes/staff-team";
import {CommentTeam} from "../_classes/comment-team";
import {NormalUser} from "../normal-user";
import {ProfileService} from "../profile.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  user: string | null | undefined;
  userID: string | null | undefined;
  season="2020-2021"
  profile: NormalUser[] | undefined;
  form: FormGroup | undefined;
  constructor(
    private route: ActivatedRoute,
    private teamservice: TeamService,
    private profileService: ProfileService,
    public fb: FormBuilder,
    private router: Router) { }
  selectedSeason: any;
  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    this.getTeam()
    this.getPlayersSeason(this.season)
    this.getStaffSeason(this.season)
    this.getCompetitionsSeason(this.season)
    this.getComments();
    this.getSeasons();
    this.getProfile();
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
  getselectedseason(){
    this.getPlayersSeason(this.season)
    this.getStaffSeason(this.season)
    this.getCompetitionsSeason(this.season)
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

  getProfile(): void{
    // @ts-ignore
    this.profileService.getProfile(this.userID).subscribe(profile => this.profile = profile);
  }
  checkfavourite(id: number){
    // @ts-ignore
    return this.profile[0].favouriteteams.find(e => e.id === id);
  }

  add_to_Favourite(){
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("team_id", this.team?.id);
    // @ts-ignore
    formData.append("user_id",  this.userID);
    formData.append("func","add")
    this.teamservice.addFavouriteTeam(this.team?.id,formData).subscribe(a => a)
    this.ngOnInit();
  }

  remove_to_Favourite(){
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("team_id", this.team?.id);
    // @ts-ignore
    formData.append("user_id",  this.userID);
    formData.append("func",  "remove");
    this.teamservice.removeFavouriteTeam(this.team?.id,formData).subscribe(a => a)
    this.ngOnInit();
  }

  deleteTeam(){
    // @ts-ignore
    this.teamservice.deleteTeam(this.team.id).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/competitions']).then(() => {
        window.location.reload();
      }),
      error => error
    )
  }

}
