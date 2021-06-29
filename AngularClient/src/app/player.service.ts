import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Team} from "./team";
import {Player} from "./player";

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

}
