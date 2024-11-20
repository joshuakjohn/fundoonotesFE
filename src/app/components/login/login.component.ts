import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signinForm!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) { }

    ngOnInit() {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get signinFormControls() { return this.signinForm.controls; }
    handleLogin(){
      if(this.signinForm.valid){
        const { email, password } = this.signinForm.value
        this.httpService.postApiCall<login>('/api/v1/users', {email, password}).subscribe({
          next: (res) => {
            console.log(res)
            localStorage.setItem("token", res.token)
            this.router.navigate(['/dashboard/notes'])
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    }
}

interface login{
  message: string;
  token: string;
}
