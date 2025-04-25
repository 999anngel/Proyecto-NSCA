import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoAllPage } from './metodo-all.page';

describe('MetodoAllPage', () => {
  let component: MetodoAllPage;
  let fixture: ComponentFixture<MetodoAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
