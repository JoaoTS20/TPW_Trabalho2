import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../_classes/player";
import {PlayerService} from "../_services/player.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentPlayer} from "../_classes/comment-player";
import {ProfileService} from "../profile.service";
import {NormalUser} from "../normal-user";
import {GlobalConstants} from "../_classes/globalconstants";

@Component({
  selector: 'app-one-player',
  templateUrl: './one-player.component.html',
  styleUrls: ['./one-player.component.css']
})
export class OnePlayerComponent implements OnInit {

  @Input() player: Player | undefined;
  comments: CommentPlayer[] | undefined;
  age: number | undefined;
  seasons: any[] |undefined;
  user: string | null | undefined;
  userID: string | null | undefined;
  baseURL = GlobalConstants.baseurl;
  profile: NormalUser[] | undefined;
  favourite: boolean | undefined;
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    this.getPlayer();
    this.getComments();
    this.getseasons();
    this.getProfile();
  }
  getPlayer(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getSelectedPlayer(id).subscribe(player => {
      this.player = player
      // @ts-ignore
      this.age= Math.floor((( Math.abs(Date.now() - Date.parse(this.player.birthday.slice(0,11)))) / (1000 * 3600 * 24))/365.25);
    });


  }
  getComments(): void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
   this.playerService.getCommentsPlayer(id).subscribe(comments => this.comments=comments);
  }

  getseasons():void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getSeasonsPlayer(id).subscribe(seasons => this.seasons=seasons);
  }
  getProfile(): void{
    // @ts-ignore
    this.profileService.getProfile(this.userID).subscribe(profile => this.profile = profile);
  }
  checkfavourite(id: number){
    // @ts-ignore
    return this.profile[0].favouriteplayers.find(e => e.id === id);
  }

  deletePlayer(){
    // @ts-ignore
    this.playerService.deletePlayer(this.player.id).subscribe(
      // @ts-ignore
      success => this.router.navigate(['/players']).then(() => {
        window.location.reload();
      }),
      error => error
    )
  }
  add_to_Favourite(){
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("player_id", this.player?.id);
    // @ts-ignore
    formData.append("user_id",  this.userID);
    formData.append("func","add")
    this.playerService.addFavouritePlayer(this.player?.id,formData).subscribe(a => a)
    this.ngOnInit();
  }

  remove_to_Favourite(){
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("player_id", this.player?.id);
    // @ts-ignore
    formData.append("user_id",  this.userID);
    formData.append("func",  "remove");
    this.playerService.removeFavouritePlayer(this.player?.id,formData).subscribe(a => a)
    this.ngOnInit();
  }

  add_comment(text: any){
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("player_id", this.player?.id);
    // @ts-ignore
    formData.append("user_id",  this.userID);
    formData.append("text", text);
    this.playerService.addCommentPlayer(this.player?.id,formData).subscribe(a => a)
    window.location.reload();
  }

}
