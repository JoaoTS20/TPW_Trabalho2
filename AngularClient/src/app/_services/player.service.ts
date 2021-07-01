import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Team} from "../_classes/team";
import {Player} from "../_classes/player";
import {CommentPlayer} from "../_classes/comment-player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseURL = 'http://localhost:8000/ws/'
  constructor(private http:HttpClient) { }

  getPlayers():Observable<Player[]>{
    const url = this.baseURL + 'players/';
    return this.http.get<Player[]>(url);
  }
  getSelectedPlayer(id:number):Observable<Player>{
    const url = this.baseURL+'players/'+id;
    return this.http.get<Player>(url);
  }
  getCommentsPlayer(id:number):Observable<CommentPlayer[]>{
    const url = this.baseURL+'players/comments/'+id;
    return this.http.get<CommentPlayer[]>(url);
  }

  getSeasonsPlayer(id:number):Observable<any[]>{
    const url = this.baseURL+'players/seasons/'+id;
    return this.http.get<any[]>(url);
  }
  addFavouritePlayer(id:any,values: any): Observable<any>{
    const url = this.baseURL+'players/' + id;
    return this.http.post<any>(url,values);
  }

  removeFavouritePlayer(id: any, values: any): Observable<any> {
    const url = this.baseURL+'players/' + id;
    return this.http.post<any>(url,values);
  }

  addCommentPlayer(id: any , values: any) {
    const url = this.baseURL+'players/' + id;
    return this.http.post<any>(url,values);
  }

}
