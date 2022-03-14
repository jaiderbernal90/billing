import { TestBed } from '@angular/core/testing';

import { NotificationInterceptor } from './notification.interceptor';

describe('NotificationInterceptor', () => {
  let service: NotificationInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
