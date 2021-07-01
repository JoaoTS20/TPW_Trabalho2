import {Router} from "@angular/router";
import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../_classes/player";
import {CommentPlayer} from "../_classes/comment-player";
import {Staff} from "../_classes/staff";
import {ActivatedRoute} from "@angular/router";
import {PlayerService} from "../_services/player.service";
import {ProfileService} from "../profile.service";
import {StaffService} from "../_services/staff.service";
import {CommentStaff} from "../comment-staff";
import {GlobalConstants} from "../_classes/globalconstants";

@Component({
  selector: 'app-one-staff',
  templateUrl: './one-staff.component.html',
  styleUrls: ['./one-staff.component.css']
})
export class OneStaffComponent implements OnInit {

  @Input() staff: Staff | undefined;
  comments: CommentStaff[] | undefined
  age: number | undefined;
  seasons: any[] |undefined;
  user: string | null | undefined;
  userID: string | null | undefined;
  baseURL = GlobalConstants.baseurl;
  constructor(private route: ActivatedRoute,
              private staffService: StaffService,
              private router: Router) { }
  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    this.getStaff();
    this.getComments();
    this.getseasons();
  }

  getStaff(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.staffService.getSelectedStaff(id).subscribe(staff => {
      this.staff = staff
      // @ts-ignore
      this.age= Math.floor((( Math.abs(Date.now() - Date.parse(this.staff.birthday.slice(0,11)))) / (1000 * 3600 * 24))/365.25);
    });
 }
  getComments(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.staffService.getStaffComments(id).subscribe(comments => this.comments=comments);
  }

  getseasons():void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.staffService.getStaffSeasons(id).subscribe(seasons => this.seasons=seasons);
  }
  add_comment(text: any){
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("staff_id", this.staff?.id);
    // @ts-ignore
    formData.append("user_id",  this.userID);
    formData.append("text", text);
    this.staffService.addCommentStaff(this.staff?.id,formData).subscribe(a => a);
    window.location.reload();
  }

  deleteStaff(){
    // @ts-ignore
    this.staffService.deleteStaff(this.staff.id).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/staff']).then(() => {
        window.location.reload();
      }),
      error => error
    )
  }

}
