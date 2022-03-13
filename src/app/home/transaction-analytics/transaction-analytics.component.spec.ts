import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAnalyticsComponent } from './transaction-analytics.component';

describe('TransactionAnalyticsComponent', () => {
  let component: TransactionAnalyticsComponent;
  let fixture: ComponentFixture<TransactionAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
