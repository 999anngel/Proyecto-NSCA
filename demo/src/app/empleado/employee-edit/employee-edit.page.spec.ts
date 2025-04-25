import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeEditPage } from './employee-edit.page';

describe('EmployeeEditPage', () => {
  let component: EmployeeEditPage;
  let fixture: ComponentFixture<EmployeeEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
