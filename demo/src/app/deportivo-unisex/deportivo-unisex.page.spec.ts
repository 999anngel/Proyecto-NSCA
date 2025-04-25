import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeportivoUnisexPage } from './deportivo-unisex.page';

describe('DeportivoUnisexPage', () => {
  let component: DeportivoUnisexPage;
  let fixture: ComponentFixture<DeportivoUnisexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportivoUnisexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
