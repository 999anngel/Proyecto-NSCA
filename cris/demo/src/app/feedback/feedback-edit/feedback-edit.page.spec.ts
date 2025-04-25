import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackEditPage } from './feedback-edit.page';

describe('FeedbackEditPage', () => {
  let component: FeedbackEditPage;
  let fixture: ComponentFixture<FeedbackEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
