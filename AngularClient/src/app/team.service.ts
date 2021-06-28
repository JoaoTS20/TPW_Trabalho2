import { Injectable } from '@angular/core';
import {Team} from "./team";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseURL = 'http://localhost:8000/ws/'
  constructor(private http:HttpClient) { }

  getTeam(id: number): Observable<Team>{
    const url = this.baseURL + 'teams/' + id+"/2020-2021";
    return this.http.get<Team>(url);
  }
}
