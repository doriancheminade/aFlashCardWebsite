import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { TestOrCramSessionComponent } from './test-or-cram-session.component';
import { CardService } from '../data/card.service';
import { Card } from '../data/card.component';

describe('TestOrCramSessionComponent', () => {
  let component: TestOrCramSessionComponent;
  let fixture: ComponentFixture<TestOrCramSessionComponent>;
  let cardService: CardService;

  class RouterStub {
    navigate(url: string[]) { return true; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule,
                 RouterTestingModule],
      declarations: [ TestOrCramSessionComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [CardService]
    })
    .compileComponents();
      let cardService: CardService;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOrCramSessionComponent);
    component = fixture.componentInstance;

    cardService = fixture.debugElement.injector.get(CardService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
