import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVypujckaComponent } from './new-vypujcka.component';

describe('NewVypujckaComponent', () => {
  let component: NewVypujckaComponent;
  let fixture: ComponentFixture<NewVypujckaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewVypujckaComponent]
    });
    fixture = TestBed.createComponent(NewVypujckaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
