import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AllteamsComponent} from "./allteams/allteams.component";
import {OneteamComponent} from "./oneteam/oneteam.component";
import {AllCompetitionsComponent} from "./all-competitions/all-competitions.component";
import {AllStaffComponent} from "./all-staff/all-staff.component";
import {AllPlayersComponent} from "./all-players/all-players.component";
import {OnePlayerComponent} from "./one-player/one-player.component";
import {CommonModule} from "@angular/common";
import {InsertCompetitionComponent} from "./insert-competition/insert-competition.component";
import {EditCompetitionComponent} from "./edit-competition/edit-competition.component";
import {OneCompetitionComponent} from "./one-competition/one-competition.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./auth-service.service";
import {InsertTeamComponent} from "./insert-team/insert-team.component";
import {EditTeamComponent} from "./edit-team/edit-team.component";
import {InsertStaffComponent} from "./insert-staff/insert-staff.component";
import {EditStaffComponent} from "./edit-staff/edit-staff.component";
import {InsertPlayerComponent} from "./insert-player/insert-player.component";
import {EditPlayerComponent} from "./edit-player/edit-player.component";
import {ProfileComponent} from "./profile/profile.component";
import {AddTeamCompetitionComponent} from "./add-team-competition/add-team-competition.component";
import {AddMatchCompetitionComponent} from "./add-match-competition/add-match-competition.component";
import {AddPlayerTeamComponent} from "./add-player-team/add-player-team.component";
import {AddStaffTeamComponent} from "./add-staff-team/add-staff-team.component";
import {OneStaffComponent} from "./one-staff/one-staff.component";

const routes: Routes =[
  {path: '', component: HomepageComponent},
  {path: 'competitions', component: AllCompetitionsComponent},
  {path: 'players', component: AllPlayersComponent},
  {path: 'staff', component: AllStaffComponent},
  {path: 'teams', component:AllteamsComponent},
  {path: 'playersdetails/:id',component:OnePlayerComponent},
  {path: 'insertcompetition', component:InsertCompetitionComponent, canActivate: [AuthGuard]},
  {path: 'insertteam', component:InsertTeamComponent, canActivate: [AuthGuard]},
  {path: 'insertstaff', component:InsertStaffComponent, canActivate: [AuthGuard]},
  {path: 'insertplayer', component:InsertPlayerComponent, canActivate: [AuthGuard]},
  {path: 'editcompetition/:id', component: EditCompetitionComponent, canActivate: [AuthGuard]},
  {path: 'editteam/:id', component: EditTeamComponent, canActivate: [AuthGuard]},
  {path: 'editstaff/:id', component: EditStaffComponent, canActivate: [AuthGuard]},
  {path: 'addteamtocompetition/:id', component: AddTeamCompetitionComponent, canActivate: [AuthGuard]},
  {path: 'addmatchtocompetition/:id', component: AddMatchCompetitionComponent, canActivate: [AuthGuard]},
  {path: 'addplayertoteam/:id', component: AddPlayerTeamComponent, canActivate: [AuthGuard]},
  {path: 'addstafftoteam/:id', component: AddStaffTeamComponent, canActivate: [AuthGuard]},
  {path: 'editplayer/:id', component: EditPlayerComponent, canActivate: [AuthGuard]},
  {path: 'teamdetails/:id',component:OneteamComponent},
  {path: 'competitiondetails/:id',component:OneCompetitionComponent},
  {path: 'staffdetails/:id',component:OneStaffComponent},
  {path: 'login',component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'profile/:id',component:ProfileComponent, canActivate: [AuthGuard]}


]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
