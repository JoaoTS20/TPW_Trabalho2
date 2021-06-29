import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AllteamsComponent} from "./allteams/allteams.component";
import {OneteamComponent} from "./oneteam/oneteam.component";
import {AllCompetitionsComponent} from "./all-competitions/all-competitions.component";
import {AllStaffComponent} from "./all-staff/all-staff.component";
import {AllPlayersComponent} from "./all-players/all-players.component";

const routes: Routes =[
  {path: '', component: HomepageComponent},
  {path: 'competitions', component: AllCompetitionsComponent},
  {path: 'players', component: AllPlayersComponent},
  {path: 'staff', component: AllStaffComponent},
  {path: 'teams', component:AllteamsComponent}

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }