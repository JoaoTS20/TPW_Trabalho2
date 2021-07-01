import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: any;

  constructor(
    private authServiceService: AuthServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  signup(username: string, email: string, password1: string, password2: string) {
    this.authServiceService.signup(username, email, password1, password2).subscribe(
      success => this.router.navigate(['']).then(() => {
        this.authServiceService.makeNormalUser(username).subscribe(a=>a)
        window.location.reload();}),
      error => this.error = error
    );
  }

}
