import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffTeamComponent } from './add-staff-team.component';

describe('AddStaffTeamComponent', () => {
  let component: AddStaffTeamComponent;
  let fixture: ComponentFixture<AddStaffTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
