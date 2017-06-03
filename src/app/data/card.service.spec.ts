import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CardService } from './card.service';

describe('CardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CardService,
                  { provide: XHRBackend, useClass: MockBackend}]
    });
  });

  it('should be created', inject([CardService, XHRBackend], (service: CardService, mockBackend: XHRBackend) => {
    expect(service).toBeTruthy();
  }));
});
