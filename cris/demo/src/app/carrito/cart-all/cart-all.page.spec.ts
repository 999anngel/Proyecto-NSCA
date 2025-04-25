import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartAllPage } from './cart-all.page';

describe('CartAllPage', () => {
  let component: CartAllPage;
  let fixture: ComponentFixture<CartAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
