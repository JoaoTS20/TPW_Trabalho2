import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerTeamComponent } from './add-player-team.component';

describe('AddPlayerTeamComponent', () => {
  let component: AddPlayerTeamComponent;
  let fixture: ComponentFixture<AddPlayerTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayerTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
