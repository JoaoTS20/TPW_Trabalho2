import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Staff} from "../_classes/staff";
import {GlobalConstants} from "../_classes/globalconstants";
import {CommentStaff} from "../comment-staff";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseURL = GlobalConstants.apiurl
  constructor(private http: HttpClient) {
  }
  getStaff(): Observable<Staff[]> {
    const url = this.baseURL + 'staff/';
    return this.http.get<Staff[]>(url);
  }

  getStaffSearch(name: any): Observable<Staff[]>{
    let url;
    if (name=="") {
      url = this.baseURL + 'staff/';
    }
    else{
      url = this.baseURL + 'staff/search/'+name;
    }
    return this.http.get<Staff[]>(url);
  }

  insertStaff(staff: any): Observable<any>{
    const url = this.baseURL + 'insertstaff/';
    return this.http.post<any>(url,staff);
  }
  editStaff(id:number,staff: any): Observable<any>{
    const url = this.baseURL + 'editstaff/'+id;
    return this.http.put<any>(url,staff);
  }
  deleteStaff(id:number){
    const url = this.baseURL + 'deletestaff/'+ id;
    return this.http.delete(url)
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
