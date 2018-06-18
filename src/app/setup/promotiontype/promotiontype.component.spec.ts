import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiontypeComponent } from './promotiontype.component';

describe('PromotiontypeComponent', () => {
  let component: PromotiontypeComponent;
  let fixture: ComponentFixture<PromotiontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotiontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
