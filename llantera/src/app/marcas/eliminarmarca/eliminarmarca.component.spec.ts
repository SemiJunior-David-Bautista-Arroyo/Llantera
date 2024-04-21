import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarmarcaComponent } from './eliminarmarca.component';

describe('EliminarmarcaComponent', () => {
  let component: EliminarmarcaComponent;
  let fixture: ComponentFixture<EliminarmarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarmarcaComponent]
    });
    fixture = TestBed.createComponent(EliminarmarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
