import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionalDetailComponent } from './transactional-detail.component';

describe('TransactionalDetailComponent', () => {
  let component: TransactionalDetailComponent;
  let fixture: ComponentFixture<TransactionalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionalDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
