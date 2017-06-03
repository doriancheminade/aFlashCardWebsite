import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CreateCardComponent } from './create-card.component';
import { CardService } from '../data/card.service';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;

  let cardService: CardService;
  let spyImage: jasmine.Spy;
  let spyCard: jasmine.Spy;
  const id = '007';

  class RouterStub {
    navigate(url: string[]) { return true; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      declarations: [ CreateCardComponent ],
      schemas: [NO_ERRORS_SCHEMA ],
      providers: [CardService,
                  { provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;

    cardService = fixture.debugElement.injector.get(CardService);

    /*spyImage = spyOn(CardService, 'uploadImage')
          .and.returnValue(Promise.resolve(id));
    spyCard = spyOn(CardService, 'uploadCard')
          .and.returnValue(Promise.resolve(id));
*/
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
