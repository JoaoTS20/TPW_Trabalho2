import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Competition} from "../competition";
import {CommentPlayer} from "../comment-player";
import {CommentCompetition} from "../comment-competition";
import {Table} from "../table";

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



}
