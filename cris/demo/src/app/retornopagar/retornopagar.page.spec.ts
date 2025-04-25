import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetornopagarPage } from './retornopagar.page';

describe('RetornopagarPage', () => {
  let component: RetornopagarPage;
  let fixture: ComponentFixture<RetornopagarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RetornopagarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
