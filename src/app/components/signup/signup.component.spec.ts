import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from 'src/app/services/http-service/http.service';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpService: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule, 
        FormsModule, 
        HttpClientTestingModule,
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      providers: [HttpService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form with default values', () => {
    const form = component.registerForm;
    expect(form).toBeDefined();
    expect(form.get('fname')?.value).toBe('');
    expect(form.get('lname')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.get('confirm')?.value).toBe('');
  });

  it('should mark the form as invalid if required fields are missing', () => {
    const form = component.registerForm;
    expect(form.valid).toBeFalse();

    form.get('fname')?.setValue('');
    form.get('lname')?.setValue('');
    form.get('email')?.setValue('');
    form.get('password')?.setValue('');
    form.get('confirm')?.setValue('');
    expect(form.valid).toBeFalse();
  });

  it('should validate email field correctly', () => {
    const emailField = component.registerForm.get('email');

    emailField?.setValue('invalid-email');
    expect(emailField?.valid).toBeFalse();
    expect(emailField?.errors?.['email']).toBeTrue();

    emailField?.setValue('valid.email@example.com');
    expect(emailField?.valid).toBeTrue();
  });

  it('should call handleRegistration and make a POST API call when form is valid', () => {
    const form = component.registerForm;
    form.setValue({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirm: 'password123',
    });

    spyOn(httpService, 'postApiCall').and.returnValue(of({ success: true }));

    component.handleRegistration();
    expect(httpService.postApiCall).toHaveBeenCalledWith('/api/v1/users/signup', {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });

  it('should not make a POST API call when form is invalid', () => {
    const form = component.registerForm;
    form.setValue({
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirm: '',
    });

    spyOn(httpService, 'postApiCall');

    component.handleRegistration();
    expect(httpService.postApiCall).not.toHaveBeenCalled();
  });

  it('should log success response when API call succeeds', () => {
    const form = component.registerForm;
    form.setValue({
      fname: 'Jane',
      lname: 'Doe',
      email: 'jane.doe@example.com',
      password: 'securepassword',
      confirm: 'securepassword',
    });

    spyOn(httpService, 'postApiCall').and.returnValue(of({ message: 'User registered successfully' }));
    spyOn(console, 'log');

    component.handleRegistration();

    expect(httpService.postApiCall).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

  it('should log error response when API call fails', () => {
    const form = component.registerForm;
    form.setValue({
      fname: 'Jane',
      lname: 'Doe',
      email: 'jane.doe@example.com',
      password: 'securepassword',
      confirm: 'securepassword',
    });

    spyOn(httpService, 'postApiCall').and.returnValue(throwError(() => new Error('API error')));
    spyOn(console, 'log');

    component.handleRegistration();

    expect(httpService.postApiCall).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(new Error('API error'));
  });
});

