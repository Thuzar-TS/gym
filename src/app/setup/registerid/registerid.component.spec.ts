import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembertypeComponent } from './membertype.component';

describe('MembertypeComponent', () => {
  let component: MembertypeComponent;
  let fixture: ComponentFixture<MembertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
