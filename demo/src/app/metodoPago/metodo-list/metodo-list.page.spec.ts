import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoListPage } from './metodo-list.page';

describe('MetodoListPage', () => {
  let component: MetodoListPage;
  let fixture: ComponentFixture<MetodoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
