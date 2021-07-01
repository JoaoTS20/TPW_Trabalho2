import { Component, OnInit } from '@angular/core';
import {Competition} from "../_classes/competition";
import {Team} from "../_classes/team";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetitionService} from "../_services/competition.service";
import {TeamService} from "../_services/team.service";

@Component({
  selector: 'app-add-match-competition',
  templateUrl: './add-match-competition.component.html',
  styleUrls: ['./add-match-competition.component.css']
})
export class AddMatchCompetitionComponent implements OnInit {

  competition: Competition | undefined;
  allteams: Team[] | undefined
  form: FormGroup

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              private competitionService: CompetitionService,
              private teamService: TeamService,
              private router: Router) {

    this.form = this.fb.group({
      ngame: null,
      description:null,
      hometeamid: '1',
      awayteamid: '1',
      homegoals:null,
      awaygoals: '2020-2021',
      season: '2020-2021'
    })
  }



  ngOnInit(): void {
    this.getCompetition()
  }

  getCompetition(){
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.competitionService.getSelectedCompetition(id).subscribe(comp => {
      this.competition = comp
    })
    this.teamService.getTeams().subscribe(teams => this.allteams= teams)
  }
  changeNGame(event: Event){
    // @ts-ignore
    const ngame = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('ngame')?.setValue(ngame)
  }

  changeDescription(event: Event){
    // @ts-ignore
    const description = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('description')?.setValue(description)
  }

  changeHomeTeam(event: Event){
    // @ts-ignore
    const hometeamid = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('hometeamid')?.setValue(hometeamid)
  }

  changeAwayTeam(event: Event){
    // @ts-ignore
    const awayteamid = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('awayteamid')?.setValue(awayteamid)
  }
  changeHomeGoals(event: Event){
    // @ts-ignore
    const homegoals = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('homegoals')?.setValue(homegoals)
  }

  changeAwayGoals(event: Event){
    // @ts-ignore
    const awaygoals = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('awaygoals')?.setValue(awaygoals)
  }

  changeSeason(event: Event){
    // @ts-ignore
    const season = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('season')?.setValue(season)
  }

  insertMatchInCompetition(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("ngame", this.form.get('ngame').value);
    // @ts-ignore
    formData.append("description", this.form.get('description').value);
    // @ts-ignore
    formData.append("hometeamid", this.form.get('hometeamid').value);
    // @ts-ignore
    formData.append("awayteamid", this.form.get('awayteamid').value);
    // @ts-ignore
    formData.append("homegoals", this.form.get('homegoals').value);
    // @ts-ignore
    formData.append("awaygoals", this.form.get('awaygoals').value);
    // @ts-ignore
    formData.append("season", this.form.get('season').value);

    // @ts-ignore
    this.competitionService.addMatchToCompetition(this.competition.id,formData).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/competitiondetails/'+this.competition.id]).then(() => {
        window.location.reload();
      }),
      error => error)
  }
}
