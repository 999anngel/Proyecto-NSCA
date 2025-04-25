import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeAllPage } from './employee-all.page';

describe('EmployeeAllPage', () => {
  let component: EmployeeAllPage;
  let fixture: ComponentFixture<EmployeeAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
