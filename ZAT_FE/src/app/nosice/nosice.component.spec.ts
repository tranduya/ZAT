import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosiceComponent } from './nosice.component';

describe('NosiceComponent', () => {
  let component: NosiceComponent;
  let fixture: ComponentFixture<NosiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosiceComponent]
    });
    fixture = TestBed.createComponent(NosiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
