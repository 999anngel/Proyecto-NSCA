import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssesoriosPage } from './assesorios.page';

describe('AssesoriosPage', () => {
  let component: AssesoriosPage;
  let fixture: ComponentFixture<AssesoriosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
