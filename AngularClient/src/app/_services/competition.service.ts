import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Competition} from "../_classes/competition";
import {CommentPlayer} from "../_classes/comment-player";
import {CommentCompetition} from "../_classes/comment-competition";
import {Table} from "../_classes/table";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private baseURL = 'http://localhost:8000/ws/'
  constructor(private http: HttpClient) {
  }
  getCompetitions(): Observable<Competition[]> {
    const url = this.baseURL + 'competitions/';
    return this.http.get<Competition[]>(url);
  }
  getSelectedCompetition(id:number):Observable<Competition>{
    const url=this.baseURL+'competitions/'+id;
    return this.http.get<Competition>(url);
  }
  getCommentsCompetitions(id:number):Observable<CommentCompetition[]>{
    const url = this.baseURL+'competitions/comments/'+id;
    return this.http.get<CommentCompetition[]>(url);
  }

  getTableCompetitions(id: number, season: string):Observable<Table>{
    const url = this.baseURL+'competitions/table/'+id+"/"+season;
    return this.http.get<Table>(url);
  }

  getMatchesCompetitions(id: number, season: string):Observable<any[]>{
    const url = this.baseURL+'competitions/matches/'+id+"/"+season;
    return this.http.get<any[]>(url);
  }
  getSeasons(id: number):Observable<any[]>{
    const url = this.baseURL+'competitions/seasons/'+id;
    return this.http.get<any[]>(url);
  }

  insertCompetition(competition:any):Observable<any>{
    const url = this.baseURL + 'insertcompetition/';
    return this.http.post(url,competition)
  }
  editCompetition( id: number, competition:any):Observable<any>{
    const url = this.baseURL + 'editcompetition/'+ id;
    return this.http.put(url,competition)
  }

  addTeamToCompetition(id: number, teamcomp: any):Observable<any>{
    const url = this.baseURL + 'addteamtocompetition/'+ id;
    return this.http.post(url,teamcomp)
  }
  addMatchToCompetition(id: number, matchcomp: any):Observable<any>{
    const url = this.baseURL + 'addmatchtocompetition/'+ id;
    return this.http.post(url,matchcomp)
  }

}
