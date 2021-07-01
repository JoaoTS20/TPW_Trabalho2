import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCompetitionComponent } from './insert-competition.component';

describe('InsertCompetitionComponent', () => {
  let component: InsertCompetitionComponent;
  let fixture: ComponentFixture<InsertCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
