import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(    private authServiceService: AuthServiceService,
                  private router: Router) {}

  ngOnInit(): void {
  }
  login(username: string, password: string) {
    this.authServiceService.login(username, password).subscribe(
      success => this.router.navigate(['']),
      error => this.error = error
    );
    console.log(localStorage.getItem("infoUser"))
  }

}
