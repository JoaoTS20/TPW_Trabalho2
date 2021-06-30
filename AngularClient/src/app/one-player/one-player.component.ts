import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../_classes/player";
import {PlayerService} from "../_services/player.service";
import {ActivatedRoute} from "@angular/router";
import {CommentPlayer} from "../_classes/comment-player";

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
  baseURL = 'http://localhost:8000';
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('username')
    this.userID = localStorage.getItem('userID')
    this.getPlayer();
    this.getComments();
    this.getseasons();
  }
  getPlayer(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getSelectedPlayer(id).subscribe(player => this.player = player);
    // @ts-ignore
    this.age= Math.floor((( Math.abs(Date.now() - this.player?.birthday)) / (1000 * 3600 * 24))/365.25);
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

}
