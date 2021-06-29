import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AllteamsComponent} from "./allteams/allteams.component";
import {OneteamComponent} from "./oneteam/oneteam.component";

const routes: Routes =[
  {path: '', component: HomepageComponent}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
