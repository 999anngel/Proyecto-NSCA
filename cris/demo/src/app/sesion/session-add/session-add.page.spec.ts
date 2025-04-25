import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionAddPage } from './session-add.page';

describe('SessionAddPage', () => {
  let component: SessionAddPage;
  let fixture: ComponentFixture<SessionAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
