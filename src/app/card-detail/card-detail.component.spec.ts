import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CardDetailComponent } from './card-detail.component';
import { CardService } from '../data/card.service';
import { Card } from '../data/card.component';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let cardService: CardService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports : [HttpModule,
                 RouterTestingModule],
      declarations: [ CardDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [CardService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;

    cardService = fixture.debugElement.injector.get(CardService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
