import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí
});
