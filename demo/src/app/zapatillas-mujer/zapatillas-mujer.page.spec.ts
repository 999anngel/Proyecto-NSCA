import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasMujerPage } from './zapatillas-mujer.page';

describe('ZapatillasMujerPage', () => {
  let component: ZapatillasMujerPage;
  let fixture: ComponentFixture<ZapatillasMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapatillasMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
