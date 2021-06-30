import { Component, OnInit } from '@angular/core';
import {TeamService} from "../_services/team.service";
import {ProfileService} from "../profile.service";
import {ActivatedRoute} from "@angular/router";
import {NormalUser} from "../normal-user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: NormalUser[] | undefined;
  baseURL = 'http://localhost:8000';
  constructor(private route: ActivatedRoute,private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.profileService.getProfile(id).subscribe(profile => this.profile = profile);
  }

}
