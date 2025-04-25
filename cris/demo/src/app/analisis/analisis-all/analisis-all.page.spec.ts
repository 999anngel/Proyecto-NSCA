import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalisisAllPage } from './analisis-all.page';

describe('AnalisisAllPage', () => {
  let component: AnalisisAllPage;
  let fixture: ComponentFixture<AnalisisAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
