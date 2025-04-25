import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoAddPage } from './metodo-add.page';

describe('MetodoAddPage', () => {
  let component: MetodoAddPage;
  let fixture: ComponentFixture<MetodoAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
