import { TestBed } from '@angular/core/testing';

import { ModalGlobalService } from './modal-global.service';

describe('ModalGlobalService', () => {
  let service: ModalGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
