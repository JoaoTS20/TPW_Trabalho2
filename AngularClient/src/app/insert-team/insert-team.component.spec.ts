import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTeamComponent } from './insert-team.component';

describe('InsertTeamComponent', () => {
  let component: InsertTeamComponent;
  let fixture: ComponentFixture<InsertTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
