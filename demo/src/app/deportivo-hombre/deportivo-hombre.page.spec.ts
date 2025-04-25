import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeportivoHombrePage } from './deportivo-hombre.page';

describe('DeportivoHombrePage', () => {
  let component: DeportivoHombrePage;
  let fixture: ComponentFixture<DeportivoHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportivoHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
