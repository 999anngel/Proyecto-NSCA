import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDetailPage } from './cart-detail.page';

describe('CartDetailPage', () => {
  let component: CartDetailPage;
  let fixture: ComponentFixture<CartDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
