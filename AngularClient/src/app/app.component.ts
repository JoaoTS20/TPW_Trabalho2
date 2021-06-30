import { Component } from '@angular/core';
import {AuthServiceService} from "./auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: string | null | undefined;
  userID: string | null | undefined;

  constructor(private authServiceService: AuthServiceService) {
  }
  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    console.log(localStorage.getItem('username'))
    console.log(localStorage.getItem('userID'))
  }

  logout(): void{
    this.authServiceService.logout();
    this.ngOnInit();
  }

  title = 'AngularClient';
}
