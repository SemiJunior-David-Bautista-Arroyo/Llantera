import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMarcasComponent } from './catalogo-marcas.component';

describe('CatalogoMarcasComponent', () => {
  let component: CatalogoMarcasComponent;
  let fixture: ComponentFixture<CatalogoMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoMarcasComponent]
    });
    fixture = TestBed.createComponent(CatalogoMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
