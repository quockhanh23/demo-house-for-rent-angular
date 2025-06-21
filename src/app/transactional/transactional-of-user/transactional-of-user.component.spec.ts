import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionalOfUserComponent } from './transactional-of-user.component';

describe('TransactionalOfUserComponent', () => {
  let component: TransactionalOfUserComponent;
  let fixture: ComponentFixture<TransactionalOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionalOfUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionalOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
