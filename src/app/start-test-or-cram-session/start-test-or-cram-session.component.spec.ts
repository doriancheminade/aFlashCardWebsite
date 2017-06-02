import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTestOrCramSessionComponent } from './start-test-or-cram-session.component';

describe('StartTestOrCramSessionComponent', () => {
  let component: StartTestOrCramSessionComponent;
  let fixture: ComponentFixture<StartTestOrCramSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTestOrCramSessionComponent ]
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
