import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { StartTestOrCramSessionComponent } from './start-test-or-cram-session.component';

describe('StartTestOrCramSessionComponent', () => {
  let component: StartTestOrCramSessionComponent;
  let fixture: ComponentFixture<StartTestOrCramSessionComponent>;

  class RouterStub {
    navigate(url: string[]) { return true; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTestOrCramSessionComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{ provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTestOrCramSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
