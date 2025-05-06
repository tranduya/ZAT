import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiloComponent } from './new-dilo.component';

describe('NewDiloComponent', () => {
  let component: NewDiloComponent;
  let fixture: ComponentFixture<NewDiloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDiloComponent]
    });
    fixture = TestBed.createComponent(NewDiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
