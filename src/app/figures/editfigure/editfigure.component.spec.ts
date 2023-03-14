import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditfigureComponent } from './editfigure.component';

describe('EditfigureComponent', () => {
  let component: EditfigureComponent;
  let fixture: ComponentFixture<EditfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
