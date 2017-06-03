import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CardsExampleComponent } from './cards-example.component';

describe('CardsExampleComponent', () => {
  let component: CardsExampleComponent;
  let fixture: ComponentFixture<CardsExampleComponent>;

  class RouterStub {
    navigate(url: string[]) { return true; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      declarations: [ CardsExampleComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{ provide: Router, useClass: RouterStub }]
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
});
