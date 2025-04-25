import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoriosUnisexPage } from './accesorios-unisex.page';

describe('AccesoriosUnisexPage', () => {
  let component: AccesoriosUnisexPage;
  let fixture: ComponentFixture<AccesoriosUnisexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoriosUnisexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
