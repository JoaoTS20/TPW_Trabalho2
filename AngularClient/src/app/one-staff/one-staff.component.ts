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
  baseURL = 'http://localhost:8000';
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
    this.staffService.getSelectedStaff(id).subscribe(staff => this.staff = staff);
    // @ts-ignore
    this.age= Math.floor((( Math.abs(Date.now() - this.player?.birthday)) / (1000 * 3600 * 24))/365.25);
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

}
