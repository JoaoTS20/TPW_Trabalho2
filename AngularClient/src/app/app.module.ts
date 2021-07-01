import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AllteamsComponent } from './allteams/allteams.component';
import { OneteamComponent } from './oneteam/oneteam.component';
import {RouterModule} from "@angular/router";
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { AllPlayersComponent } from './all-players/all-players.component';
import { AllStaffComponent } from './all-staff/all-staff.component';
import { AllCompetitionsComponent } from './all-competitions/all-competitions.component';
import { OnePlayerComponent } from './one-player/one-player.component';
import { OneStaffComponent } from './one-staff/one-staff.component';
import { OneCompetitionComponent } from './one-competition/one-competition.component';
import { InsertCompetitionComponent } from './insert-competition/insert-competition.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditCompetitionComponent } from './edit-competition/edit-competition.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InsertTeamComponent } from './insert-team/insert-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { InsertStaffComponent } from './insert-staff/insert-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { InsertPlayerComponent } from './insert-player/insert-player.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard, AuthInterceptor} from "./auth-service.service";
import { AddTeamCompetitionComponent } from './add-team-competition/add-team-competition.component';
import { AddMatchCompetitionComponent } from './add-match-competition/add-match-competition.component';
import { AddPlayerTeamComponent } from './add-player-team/add-player-team.component';
import { AddStaffTeamComponent } from './add-staff-team/add-staff-team.component';

@NgModule({
  declarations: [
    AppComponent,
    AllteamsComponent,
    OneteamComponent,
    HomepageComponent,
    AllPlayersComponent,
    AllStaffComponent,
    AllCompetitionsComponent,
    OnePlayerComponent,
    OneStaffComponent,
    OneCompetitionComponent,
    InsertCompetitionComponent,
    EditCompetitionComponent,
    LoginComponent,
    SignupComponent,
    InsertTeamComponent,
    EditTeamComponent,
    InsertStaffComponent,
    EditStaffComponent,
    InsertPlayerComponent,
    EditPlayerComponent,
    ProfileComponent,
    AddTeamCompetitionComponent,
    AddMatchCompetitionComponent,
    AddPlayerTeamComponent,
    AddStaffTeamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
