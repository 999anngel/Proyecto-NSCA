import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CuentaPage } from './cuenta.page';

describe('CuentaPage', () => {
  let component: CuentaPage;
  let fixture: ComponentFixture<CuentaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuentaPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
