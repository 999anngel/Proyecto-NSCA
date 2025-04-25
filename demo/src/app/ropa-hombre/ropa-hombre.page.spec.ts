import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RopaHombrePage } from './ropa-hombre.page';

describe('RopaHombrePage', () => {
  let component: RopaHombrePage;
  let fixture: ComponentFixture<RopaHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RopaHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
