import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Competition} from "./competition";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'undefined'})
}

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
  getCompetition(id: number): Observable<Competition> {
    const url = this.baseURL + 'competitions/'+id;
    return this.http.get<Competition>(url);
  }
  insertCompetition(competition:any):Observable<any>{
    const url = this.baseURL + 'insertcompetition/';
    return this.http.post(url,competition)
  }
  editCompetition( id: number, competition:any):Observable<any>{
    const url = this.baseURL + 'editcompetition/'+ id;
    return this.http.post(url,competition)
  }
}
