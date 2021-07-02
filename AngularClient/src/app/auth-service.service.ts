import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {GlobalConstants} from "./_classes/globalconstants";
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseURL = GlobalConstants.apiurl +'auth/'
  constructor(private http: HttpClient) {
  }

  private setSession(authResult: any) {
    const token = authResult.token;
    // @ts-ignore
    const payload = <JWTPayload> jwt_decode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('username',payload.username)
    localStorage.setItem('userID',String(payload.user_id))
    // @ts-ignore
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  get token(): string {
    return <string>localStorage.getItem('token');
  }
  login(username: string, password: string) {
    return this.http.post(
      this.baseURL.concat('login/'),
      { username, password }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  signup(username: string, email: string, password1: string, password2: string) {
    return this.http.post(
      this.baseURL.concat('signup/'),
      { username, email, password1, password2 }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('userID' );
  }

  // @ts-ignore
  refreshToken() {
    // @ts-ignore
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.baseURL.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  // @ts-ignore
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  makeNormalUser(username: string) {
    const url = this.baseURL + 'normaluser/'+username;
    // @ts-ignore
    return this.http.post(url)

  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }

}
interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
