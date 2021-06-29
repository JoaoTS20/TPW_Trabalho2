import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../player";
import {PlayerService} from "../player.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-one-player',
  templateUrl: './one-player.component.html',
  styleUrls: ['./one-player.component.css']
})
export class OnePlayerComponent implements OnInit {

  @Input() player: Player | undefined;
  age: number | undefined;
  baseURL = 'http://localhost:8000';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayer();
  }
  getPlayer(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getSelectedPlayer(id).subscribe(player => this.player = player);
    // @ts-ignore
    this.age= Math.floor((( Math.abs(Date.now() - this.player?.birthday.getDate())) / (1000 * 3600 * 24))/365.25);
  }

}
