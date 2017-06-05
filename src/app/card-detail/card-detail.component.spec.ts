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
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let cardServiceSpy: CardServiceSpy;

  class CardServiceSpy {
    someCard =
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
    //not a function?
    getCard = jasmine.createSpy('getCard').and.callFake(
      (id: string) => Promise
      .resolve(true)
      .then(() => {return this.someCard;})
    );
    /*getCard(id: string): Promise<any> {
        return Promise.resolve(true)
                        .then( () => this.someCard);
    }*/
    /*getCard = function(id: string) { Promise
        .resolve(true)
        .then(() => {Object.assign({}, this.someCard)})};
    getCardSpy = jasmine.createSpy('getCard').and.callFake(
      (id: string) => Promise
        .resolve(true)
        .then(() => {Object.assign({}, this.someCard)})
    )*/
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [HttpModule,
                 RouterTestingModule/*.withRoutes(
        [{path: 'some/route', component: CardService}])*/
      ],
      declarations: [ CardDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [CardService
                  //,{ provide: Router, useClass: RouterStub }
                ]
    })
    .overrideComponent(CardDetailComponent, {
      set: {
        providers: [
          {provide: CardService, useValue: CardServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;

    this.cardServiceSpy = fixture.debugElement.injector.get(CardService) as any;

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should not display a card yet', () => {
    let de = fixture.debugElement.query(By.css('#theCardWord'));
    expect(de).toBe(null, 'no card yet');
    //cardServiceSpy = fixture.debugElement.injector.get(CardService) as any;
    //expect(cardServiceSpy.getCardSpy.calls.count()).toBe(0, 'not called yet');
  })
  it('should populate page with card details', async(inject([CardService],(cardServiceSpy:CardService)=>{

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //cardServiceSpy = fixture.debugElement.injector.get(CardService) as any;
        //expect(this.cardServiceSpy.getCard.calls.count()).toBeGreaterThan(0, 'called once');
        let cow = fixture.debugElement.query(By.css('#theCardWord'));
        expect(cow).toContain('teapot');
        expect(cow).toContain('oooooooooOoooooooooooo');
      });
  })))
    /*it('should populate page with card details', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //cardServiceSpy = fixture.debugElement.injector.get(CardService) as any;
        expect(this.cardServiceSpy.getCard.calls.count()).toBeGreaterThan(0, 'called once');
        let cow = fixture.debugElement.query(By.css('#theCardWord'));
        expect(cow).toContain('teapot');
        expect(cow).toContain('oooooooooOoooooooooooo');
      });
    }));*/
  /*it('should populate page with card details', async(() =>{

    fixture.whenStable().then(() => {

    let cow = fixture.debugElement.query(By.css('.cardOriginalWord'));
    expect(cow).toContain('teapot');
    expect(cow).toContain('oooooooooOoooooooooooo');

    })
  }))*/
});
