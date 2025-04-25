import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudasDetailPage } from './ayudas-detail.page';

describe('AyudasDetailPage', () => {
  let component: AyudasDetailPage;
  let fixture: ComponentFixture<AyudasDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudasDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
