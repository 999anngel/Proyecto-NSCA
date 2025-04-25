import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerTarjetaPage } from './ver-tarjeta.page';

describe('VerTarjetaPage', () => {
  let component: VerTarjetaPage;
  let fixture: ComponentFixture<VerTarjetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
