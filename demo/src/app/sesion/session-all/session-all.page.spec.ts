import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionAllPage } from './session-all.page';

describe('SessionAllPage', () => {
  let component: SessionAllPage;
  let fixture: ComponentFixture<SessionAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
