import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Player} from "./_classes/player";
import {NormalUser} from "./normal-user";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseURL = 'http://localhost:8000/ws/'
  constructor(private http:HttpClient) { }

  getProfile(id:number):Observable<NormalUser[]>{
    const url = this.baseURL + 'profile/'+id;
    return this.http.get<NormalUser[]>(url);
  }
  getAdminProfile(id:number):Observable<User[]>{
    const url = this.baseURL + 'adminprofile/'+id;
    return this.http.get<User[]>(url);
  }
}
