import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoprovComponent } from './nuevoprov.component';

describe('NuevoprovComponent', () => {
  let component: NuevoprovComponent;
  let fixture: ComponentFixture<NuevoprovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoprovComponent]
    });
    fixture = TestBed.createComponent(NuevoprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
