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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard, AuthInterceptor} from "./auth-service.service";

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
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
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
