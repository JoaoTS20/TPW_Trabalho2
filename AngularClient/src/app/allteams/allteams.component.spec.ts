import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllteamsComponent } from './allteams.component';

describe('AllteamsComponent', () => {
  let component: AllteamsComponent;
  let fixture: ComponentFixture<AllteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
