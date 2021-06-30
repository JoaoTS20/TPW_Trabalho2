import { Component, OnInit } from '@angular/core';
import {TeamService} from "../_services/team.service";
import {Player} from "../_classes/player";
import {Team} from "../_classes/team";
import {PlayerService} from "../_services/player.service";

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent implements OnInit {

  players: Player[] | undefined;
  baseURL = 'http://localhost:8000';

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }
  getPlayers(): void{
    this.playerService.getPlayers().subscribe(players => this.players=players)
  }

}




