import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeportivoMujerPage } from './deportivo-mujer.page';

describe('DeportivoMujerPage', () => {
  let component: DeportivoMujerPage;
  let fixture: ComponentFixture<DeportivoMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportivoMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
