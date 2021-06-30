import { Injectable } from '@angular/core';
import {Team} from "../team";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PlayersTeam} from "../players-team";
import {StaffTeam} from "../staff-team";
import {CommentPlayer} from "../comment-player";
import {CommentTeam} from "../comment-team";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseURL = 'http://localhost:8000/ws/'
  constructor(private http:HttpClient) { }

  getTeams():Observable<Team[]>{
    const url = this.baseURL + 'teams/';
    return this.http.get<Team[]>(url);
  }

  getTeam(id: number): Observable<Team>{
    const url = this.baseURL + 'teams/' + id;
    return this.http.get<Team>(url);
  }
  getTeamPlayers(id: number, season: string): Observable<PlayersTeam>  {
    const url = this.baseURL + 'teams/players/' + id+"/"+season;
    return this.http.get<PlayersTeam>(url);
  }
  getTeamStaff(id: number, season: string): Observable<any[]>  {
    const url = this.baseURL + 'teams/staff/' + id+"/"+season;
    return this.http.get<any[]>(url);
  }
  getTeamComments(id:number): Observable<CommentTeam[]>{
      const url = this.baseURL+'teams/comments/'+id;
      return this.http.get<CommentTeam[]>(url);
    }

  getTeamCompetition(id: number, season: string): Observable<any>  {
    const url = this.baseURL + 'teams/competitions/' + id+"/"+season;
    return this.http.get<any>(url);
  }
  getTeamSeasons(id:number): Observable<any[]>  {
    const url = this.baseURL + 'teams/seasons/' + id;
    return this.http.get<any[]>(url);
  }


}
