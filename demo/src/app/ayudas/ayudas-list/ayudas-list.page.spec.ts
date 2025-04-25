import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudasListPage } from './ayudas-list.page';

describe('AyudasListPage', () => {
  let component: AyudasListPage;
  let fixture: ComponentFixture<AyudasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
