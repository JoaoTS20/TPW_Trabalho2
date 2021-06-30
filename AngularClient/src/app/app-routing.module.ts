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
import {OneCompetitionComponent} from "./one-competition/one-competition.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./auth-service.service";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes =[
  {path: '', component: HomepageComponent},
  {path: 'competitions', component: AllCompetitionsComponent},
  {path: 'players', component: AllPlayersComponent},
  {path: 'staff', component: AllStaffComponent},
  {path: 'teams', component:AllteamsComponent},
  {path: 'playersdetails/:id',component:OnePlayerComponent},
  {path: 'teamdetails/:id',component:OneteamComponent},
  {path: 'competitiondetails/:id',component:OneCompetitionComponent},
  {path: 'login',component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'profile/:id',component:ProfileComponent}



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
