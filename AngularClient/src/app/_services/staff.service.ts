import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Staff} from "../_classes/staff";

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
  getcertainStaff(id:number): Observable<Staff> {
    const url = this.baseURL + 'staff/'+id;
    return this.http.get<Staff>(url);
  }
  insertStaff(staff: any): Observable<any>{
    const url = this.baseURL + 'insertstaff/';
    return this.http.post<any>(url,staff);
  }
  editStaff(id:number,staff: any): Observable<any>{
    const url = this.baseURL + 'editstaff/'+id;
    return this.http.post<any>(url,staff);
  }
}
