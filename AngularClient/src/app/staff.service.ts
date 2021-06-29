import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Staff} from "./staff";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseURL = 'http://localhost:8000/ws/'
  constructor(private http: HttpClient) {
  }
  getStaff(): Observable<Staff[]> {
    const url = this.baseURL + 'staff/';
    return this.http.get<Staff[]>(url);
  }
}
