import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AllteamsComponent } from './allteams/allteams.component';
import { OneteamComponent } from './oneteam/oneteam.component';

@NgModule({
  declarations: [
    AppComponent,
    AllteamsComponent,
    OneteamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
