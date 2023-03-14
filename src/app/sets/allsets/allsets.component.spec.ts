import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsetsComponent } from './allsets.component';

describe('AllsetsComponent', () => {
  let component: AllsetsComponent;
  let fixture: ComponentFixture<AllsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllsetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
