import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackDetailPage } from './feedback-detail.page';

describe('FeedbackDetailPage', () => {
  let component: FeedbackDetailPage;
  let fixture: ComponentFixture<FeedbackDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
