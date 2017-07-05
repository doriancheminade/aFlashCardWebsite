import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule  } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { CardDetailComponent } from './card-detail.component';
import { CardService } from '../data/card.service';
import { Card } from '../data/card.component';
import { ActivatedRouteStub, RouterStub } from '../testing/router-stubs';

describe('CardDetailComponent', () => {
  let comp: CardDetailComponent;
  let fix: ComponentFixture<CardDetailComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let cardService: CardService;
  let spy: jasmine.Spy;
  let  someCard:any =
    [{"name": "teapot", "type":"noun", "word":"teapot", "image": "foo.png",
        "translation":[{
            "info":"(=recipient)",
            "translation": "ча́йник",
            "example":{
                "en":"Oh, the hole in my teapot ?",
                "ru":"О, дырка от пули в моём чайнике?"
                }
            }
        ]
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailComponent],
      providers: [CardService],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports : [HttpModule, RouterTestingModule]
    })

    fix = TestBed.createComponent(CardDetailComponent);
    comp = fix.componentInstance;
    cardService = fix.debugElement.injector.get(CardService);
    spy = spyOn(cardService, 'getCard')
          .and.returnValue(Promise.resolve(someCard));
  })

  it('should display a title', () => {
    de = fix.debugElement.query(By.css('h3'));
    el = de.nativeElement;
    fix.detectChanges();
    expect(el.textContent).toContain('Card detail');
  })

  it('should have card details', async(() => {
    fix.detectChanges();
    fix.whenStable().then(() => {
      fix.detectChanges();

      de = fix.debugElement.query(By.css('#theCardWord'));
      el = de.nativeElement;
      expect(el.textContent).toContain('teapot');
    })
  }))
});
