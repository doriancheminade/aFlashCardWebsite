import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOrCramSessionComponent } from './test-or-cram-session.component';

describe('TestOrCramSessionComponent', () => {
  let component: TestOrCramSessionComponent;
  let fixture: ComponentFixture<TestOrCramSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOrCramSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOrCramSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
