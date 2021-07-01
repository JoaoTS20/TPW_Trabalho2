import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Staff} from "../_classes/staff";
import {CommentStaff} from "../comment-staff";

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

  getSelectedStaff(id: any):Observable<Staff>{
    const url = this.baseURL + 'staff/'+id;
    return this.http.get<Staff>(url);
  }
  getStaffComments(id: any):Observable<CommentStaff[]>{
    const url = this.baseURL + 'staff/comments/'+id;
    return this.http.get<CommentStaff[]>(url);
  }
  getStaffSeasons(id: any):Observable<any[]>{
    const url = this.baseURL + 'staff/seasons/'+id;
    return this.http.get<any[]>(url);
  }
  addCommentStaff(id: any, formData: any) {
    const url = this.baseURL + 'staff/'+id;
    return this.http.post<Staff>(url,formData);
  }
}
