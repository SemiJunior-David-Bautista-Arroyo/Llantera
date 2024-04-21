import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarmarcaComponent } from './actualizarmarca.component';

describe('ActualizarmarcaComponent', () => {
  let component: ActualizarmarcaComponent;
  let fixture: ComponentFixture<ActualizarmarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarmarcaComponent]
    });
    fixture = TestBed.createComponent(ActualizarmarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
