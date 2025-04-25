import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoEditPage } from './metodo-edit.page';

describe('MetodoEditPage', () => {
  let component: MetodoEditPage;
  let fixture: ComponentFixture<MetodoEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
