import { Component, OnInit } from '@angular/core';
import {TeamService} from "../_services/team.service";
import {Player} from "../_classes/player";
import {Team} from "../_classes/team";
import {PlayerService} from "../_services/player.service";
import {GlobalConstants} from "../_classes/globalconstants";

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent implements OnInit {

  players: Player[] | undefined;
  baseURL = GlobalConstants.baseurl;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }
  getPlayers(): void{
    this.playerService.getPlayers().subscribe(players => this.players=players)
  }

}




