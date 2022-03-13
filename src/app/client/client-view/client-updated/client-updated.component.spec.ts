import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUpdatedComponent } from './client-updated.component';

describe('ClientUpdatedComponent', () => {
  let component: ClientUpdatedComponent;
  let fixture: ComponentFixture<ClientUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUpdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
