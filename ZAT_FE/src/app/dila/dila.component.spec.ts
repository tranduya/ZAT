import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilaComponent } from './dila.component';

describe('DilaComponent', () => {
  let component: DilaComponent;
  let fixture: ComponentFixture<DilaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DilaComponent]
    });
    fixture = TestBed.createComponent(DilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
