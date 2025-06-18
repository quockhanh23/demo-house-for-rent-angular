import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOfUserComponent } from './house-of-user.component';

describe('HouseOfUserComponent', () => {
  let component: HouseOfUserComponent;
  let fixture: ComponentFixture<HouseOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseOfUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
