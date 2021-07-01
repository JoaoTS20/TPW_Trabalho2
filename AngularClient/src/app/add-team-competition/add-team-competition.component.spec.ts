import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamCompetitionComponent } from './add-team-competition.component';

describe('AddTeamCompetitionComponent', () => {
  let component: AddTeamCompetitionComponent;
  let fixture: ComponentFixture<AddTeamCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
