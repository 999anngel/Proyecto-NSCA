import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasHombrePage } from './zapatillas-hombre.page';

describe('ZapatillasHombrePage', () => {
  let component: ZapatillasHombrePage;
  let fixture: ComponentFixture<ZapatillasHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapatillasHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
