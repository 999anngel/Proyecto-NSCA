import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoriosHombrePage } from './accesorios-hombre.page';

describe('AccesoriosHombrePage', () => {
  let component: AccesoriosHombrePage;
  let fixture: ComponentFixture<AccesoriosHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoriosHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
