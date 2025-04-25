import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RopaMujerPage } from './ropa-mujer.page';

describe('RopaMujerPage', () => {
  let component: RopaMujerPage;
  let fixture: ComponentFixture<RopaMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RopaMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
