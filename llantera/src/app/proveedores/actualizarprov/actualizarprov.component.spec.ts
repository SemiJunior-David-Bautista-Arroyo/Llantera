import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarprovComponent } from './actualizarprov.component';

describe('ActualizarprovComponent', () => {
  let component: ActualizarprovComponent;
  let fixture: ComponentFixture<ActualizarprovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarprovComponent]
    });
    fixture = TestBed.createComponent(ActualizarprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
