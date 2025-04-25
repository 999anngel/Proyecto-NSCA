import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudasAddPage } from './ayudas-add.page';

describe('AyudasAddPage', () => {
  let component: AyudasAddPage;
  let fixture: ComponentFixture<AyudasAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudasAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
