import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionEditPage } from './session-edit.page';

describe('SessionEditPage', () => {
  let component: SessionEditPage;
  let fixture: ComponentFixture<SessionEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
