import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlayerService} from "../_services/player.service";
import {Player} from "../_classes/player";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  player: Player | undefined;
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private playerService: PlayerService) {
    this.form = this.fb.group({
      player_img: null,
      full_name : null,
      name : null,
      birthday: null,
      height : null,
      nationality : null,
      position: null,
      best_foot : null,
      preferred_number : null,
    })
  }

  ngOnInit(): void {
    this.getPlayer()
  }

  getPlayer(){
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getSelectedPlayer(id).subscribe(player => {
      this.form.patchValue({
        full_name : player.full_name,
        name : player.name,
        birthday: player.birthday,
        height : player.height,
        nationality : player.nationality,
        position: player.position,
        best_foot : player.best_foot,
        preferred_number : player.preferred_number,
      });
      this.player = player;
    })
  }

  upload(event: Event){

    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    // @ts-ignore
    this.form.get('player_img')?.setValue(file)

  }

  changeName(event: Event){
    // @ts-ignore
    const name = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('name')?.setValue(name)
  }

  changeFullName(event: Event){
    // @ts-ignore
    const full_name = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('full_name')?.setValue(full_name)
  }

  changeBirthday(event: Event){
    // @ts-ignore
    const birthday = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('birthday')?.setValue(birthday)
  }

  changeNationality(event: Event){
    // @ts-ignore
    const nationality = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('nationality')?.setValue(nationality)
  }
  changePosition(event: Event){
    // @ts-ignore
    const position = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('position')?.setValue(position)
  }
  changePreferedNumber(event: Event){
    // @ts-ignore
    const preferred_number = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('preferred_number')?.setValue(preferred_number)
  }
  changeBestFoot(event: Event){
    // @ts-ignore
    const best_foot = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('best_foot')?.setValue(best_foot)
  }

  changeHeight(event: Event){
    // @ts-ignore
    const height = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.form.get('height')?.setValue(height)
  }

  insertPlayer(){
    //chamar service
    const formData: any = new FormData();
    // @ts-ignore
    formData.append("player_img", this.form.get('player_img').value);
    // @ts-ignore
    formData.append("full_name", this.form.get('full_name').value);
    // @ts-ignore
    formData.append("name", this.form.get('name').value);
    // @ts-ignore
    formData.append("birthday", this.form.get('birthday').value);
    // @ts-ignore
    formData.append("height", this.form.get('height').value);
    // @ts-ignore
    formData.append("nationality", this.form.get('nationality').value);
    // @ts-ignore
    formData.append("position", this.form.get('position').value);
    // @ts-ignore
    formData.append("best_foot", this.form.get('best_foot').value);
    // @ts-ignore
    formData.append("preferred_number", this.form.get('preferred_number').value);

    // @ts-ignore
    this.playerService.editPlayer(this.player.id,formData).subscribe(a => a)
  }
}
