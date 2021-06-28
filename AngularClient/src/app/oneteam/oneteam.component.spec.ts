import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneteamComponent } from './oneteam.component';

describe('OneteamComponent', () => {
  let component: OneteamComponent;
  let fixture: ComponentFixture<OneteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
