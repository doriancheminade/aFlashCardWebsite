import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CardsExampleComponent } from './cards-example.component';
import { CardService } from '../data/card.service';

describe('CardsExampleComponent', () => {
  let component: CardsExampleComponent;
  let fixture: ComponentFixture<CardsExampleComponent>;
  let cardService: CardService;
  let spy: jasmine.Spy;
  let someCard =
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

  class RouterStub {
    navigate(url: string[]) { return true; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      declarations: [ CardsExampleComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [CardService, { provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  /*it('', () => {


  });*/
});
