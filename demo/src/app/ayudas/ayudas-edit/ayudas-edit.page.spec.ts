import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudasEditPage } from './ayudas-edit.page';

describe('AyudasEditPage', () => {
  let component: AyudasEditPage;
  let fixture: ComponentFixture<AyudasEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudasEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
