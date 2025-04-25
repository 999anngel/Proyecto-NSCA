import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficossPage } from './graficoss.page';

describe('GraficossPage', () => {
  let component: GraficossPage;
  let fixture: ComponentFixture<GraficossPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficossPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
