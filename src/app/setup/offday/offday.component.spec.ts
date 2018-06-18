import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffdayComponent } from './offday.component';

describe('OffdayComponent', () => {
  let component: OffdayComponent;
  let fixture: ComponentFixture<OffdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
