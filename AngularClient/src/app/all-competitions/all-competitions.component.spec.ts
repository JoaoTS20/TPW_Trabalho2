import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompetitionsComponent } from './all-competitions.component';

describe('AllCompetitionsComponent', () => {
  let component: AllCompetitionsComponent;
  let fixture: ComponentFixture<AllCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCompetitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
