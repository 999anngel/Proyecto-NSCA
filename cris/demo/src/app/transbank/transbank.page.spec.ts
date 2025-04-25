import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransbankPage } from './transbank.page';

describe('TransbankPage', () => {
  let component: TransbankPage;
  let fixture: ComponentFixture<TransbankPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransbankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
