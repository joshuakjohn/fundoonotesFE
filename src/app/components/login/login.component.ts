import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signinForm!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private httpService: HttpService) { }

    ngOnInit() {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get signinFormControls() { return this.signinForm.controls; }
    handleLogin(){
      
    }
}
