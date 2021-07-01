import { Component, OnInit } from '@angular/core';
import {Competition} from "../_classes/competition";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompetitionService} from "../_services/competition.service";
import {Team} from "../_classes/team";
import {TeamService} from "../_services/team.service";

@Component({
  selector: 'app-add-team-competition',
  templateUrl: './add-team-competition.component.html',
  styleUrls: ['./add-team-competition.component.css']
})
export class AddTeamCompetitionComponent implements OnInit {

  competition: Competition | undefined;
  allteams: Team[] | undefined
  form: FormGroup

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              private competitionService: CompetitionService,
              private teamService: TeamService) {

    this.form = this.fb.group({
      teamid: null,
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

  changeTeam(event: Event){
    // @ts-ignore
    const teamid = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('teamid')?.setValue(teamid)
  }
  changeSeason(event: Event){
    // @ts-ignore
    const season = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.form.get('season')?.setValue(season)
  }

  insertTeamInCompetition(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("teamid", this.form.get('teamid').value);
    // @ts-ignore
    formData.append("season", this.form.get('season').value);

    // @ts-ignore
    this.competitionService.addTeamToCompetition(this.competition.id,formData).subscribe(a => a)
  }

}
