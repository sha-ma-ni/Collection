import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFigureComponent } from './delete-figure.component';

describe('DeleteFigureComponent', () => {
  let component: DeleteFigureComponent;
  let fixture: ComponentFixture<DeleteFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
