import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionalCreateComponent } from './transactional-create.component';

describe('TransactionalCreateComponent', () => {
  let component: TransactionalCreateComponent;
  let fixture: ComponentFixture<TransactionalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionalCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
