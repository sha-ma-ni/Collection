import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFigureComponent } from './add-figure.component';

describe('NewfigureComponent', () => {
  let component: AddFigureComponent;
  let fixture: ComponentFixture<AddFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
