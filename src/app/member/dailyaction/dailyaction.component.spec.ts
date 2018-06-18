import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyactionComponent } from './dailyaction.component';

describe('CategoriesComponent', () => {
  let component: DailyactionComponent;
  let fixture: ComponentFixture<DailyactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
