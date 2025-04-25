import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoriosMujerPage } from './accesorios-mujer.page';

describe('AccesoriosMujerPage', () => {
  let component: AccesoriosMujerPage;
  let fixture: ComponentFixture<AccesoriosMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoriosMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
