import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiloComponent } from './edit-dilo.component';

describe('EditDiloComponent', () => {
  let component: EditDiloComponent;
  let fixture: ComponentFixture<EditDiloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDiloComponent]
    });
    fixture = TestBed.createComponent(EditDiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
