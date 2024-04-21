import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevamarcaComponent } from './nuevamarca.component';

describe('NuevamarcaComponent', () => {
  let component: NuevamarcaComponent;
  let fixture: ComponentFixture<NuevamarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevamarcaComponent]
    });
    fixture = TestBed.createComponent(NuevamarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
