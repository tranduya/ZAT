import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVypujckaComponent } from './edit-vypujcka.component';

describe('EditVypujckaComponent', () => {
  let component: EditVypujckaComponent;
  let fixture: ComponentFixture<EditVypujckaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVypujckaComponent]
    });
    fixture = TestBed.createComponent(EditVypujckaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
