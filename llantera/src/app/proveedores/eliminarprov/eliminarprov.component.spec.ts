import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarprovComponent } from './eliminarprov.component';

describe('EliminarprovComponent', () => {
  let component: EliminarprovComponent;
  let fixture: ComponentFixture<EliminarprovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarprovComponent]
    });
    fixture = TestBed.createComponent(EliminarprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
