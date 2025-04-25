import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasUnisexPage } from './zapatillas-unisex.page';

describe('ZapatillasUnisexPage', () => {
  let component: ZapatillasUnisexPage;
  let fixture: ComponentFixture<ZapatillasUnisexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapatillasUnisexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
