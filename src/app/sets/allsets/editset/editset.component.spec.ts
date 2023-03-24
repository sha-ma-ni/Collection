import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsetComponent } from './editset.component';

describe('EditsetComponent', () => {
  let component: EditsetComponent;
  let fixture: ComponentFixture<EditsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
