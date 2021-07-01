import { Component, OnInit } from '@angular/core';
import {Competition} from "../_classes/competition";
import {Team} from "../_classes/team";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetitionService} from "../_services/competition.service";
import {TeamService} from "../_services/team.service";
import {Player} from "../_classes/player";
import {PlayerService} from "../_services/player.service";

@Component({
  selector: 'app-add-player-team',
  templateUrl: './add-player-team.component.html',
  styleUrls: ['./add-player-team.component.css']
})
export class AddPlayerTeamComponent implements OnInit {

  team: Team | undefined;
  allplayers: Player[] | undefined
  form: FormGroup

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              private playerService: PlayerService,
              private teamService: TeamService,
              private router: Router) {

    this.form = this.fb.group({
      playerid: '1',
      season: '2020-2021'
    })
  }



  ngOnInit(): void {
    this.getTeam()

  }

  getTeam(){
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamService.getTeam(id).subscribe(team => {
      this.team = team
    })
    this.playerService.getPlayers().subscribe(players => this.allplayers= players)
  }

  changePlayer(event: Event){
    // @ts-ignore
    const playerid = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('playerid')?.setValue(playerid)
  }
  changeSeason(event: Event){
    // @ts-ignore
    const season = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('season')?.setValue(season)
  }

  insertPlayerInTeam(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("playerid", this.form.get('playerid').value);
    // @ts-ignore
    formData.append("season", this.form.get('season').value);

    // @ts-ignore
    this.teamService.addPlayertoTeam(this.team.id,formData).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/teamdetails/'+this.team.id]).then(() => {
        window.location.reload();
      }),
      error => error)
  }
}
