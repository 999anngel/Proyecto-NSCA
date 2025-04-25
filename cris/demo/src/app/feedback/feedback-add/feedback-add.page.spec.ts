import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackAddPage } from './feedback-add.page';

describe('FeedbackAddPage', () => {
  let component: FeedbackAddPage;
  let fixture: ComponentFixture<FeedbackAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
