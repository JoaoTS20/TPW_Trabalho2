import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneStaffComponent } from './one-staff.component';

describe('OneStaffComponent', () => {
  let component: OneStaffComponent;
  let fixture: ComponentFixture<OneStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
