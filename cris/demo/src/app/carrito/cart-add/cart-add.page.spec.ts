import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartAddPage } from './cart-add.page';

describe('CartAddPage', () => {
  let component: CartAddPage;
  let fixture: ComponentFixture<CartAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
