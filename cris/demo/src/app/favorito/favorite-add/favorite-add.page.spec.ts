import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteAddPage } from './favorite-add.page';

describe('FavoriteAddPage', () => {
  let component: FavoriteAddPage;
  let fixture: ComponentFixture<FavoriteAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
