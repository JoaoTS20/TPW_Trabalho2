import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatchCompetitionComponent } from './add-match-competition.component';

describe('AddMatchCompetitionComponent', () => {
  let component: AddMatchCompetitionComponent;
  let fixture: ComponentFixture<AddMatchCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatchCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatchCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
