import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackAllPage } from './feedback-all.page';

describe('FeedbackAllPage', () => {
  let component: FeedbackAllPage;
  let fixture: ComponentFixture<FeedbackAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
