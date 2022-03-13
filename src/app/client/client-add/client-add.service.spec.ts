import { TestBed } from '@angular/core/testing';

import { ClientAddService } from './client-add.service';

describe('ClientAddService', () => {
  let service: ClientAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
