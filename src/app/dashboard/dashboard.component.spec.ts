import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DashboardComponent } from './dashboard.component';
import { CardService } from '../data/card.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let cardService: CardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      declarations: [ DashboardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [CardService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    cardService = fixture.debugElement.injector.get(CardService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
