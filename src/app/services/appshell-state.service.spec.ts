import { TestBed } from '@angular/core/testing';

import { AppshellStateService } from './appshell-state.service';

describe('AppshellStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppshellStateService = TestBed.get(AppshellStateService);
    expect(service).toBeTruthy();
  });
});
