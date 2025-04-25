import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudasAllPage } from './ayudas-all.page';

describe('AyudasAllPage', () => {
  let component: AyudasAllPage;
  let fixture: ComponentFixture<AyudasAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudasAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
