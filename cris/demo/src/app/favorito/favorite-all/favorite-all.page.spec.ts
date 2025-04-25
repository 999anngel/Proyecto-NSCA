import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteAllPage } from './favorite-all.page';

describe('FavoriteAllPage', () => {
  let component: FavoriteAllPage;
  let fixture: ComponentFixture<FavoriteAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
