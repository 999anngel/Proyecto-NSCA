import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoDetailPage } from './metodo-detail.page';

describe('MetodoDetailPage', () => {
  let component: MetodoDetailPage;
  let fixture: ComponentFixture<MetodoDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
