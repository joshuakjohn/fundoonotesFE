import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registerForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private httpService: HttpService){}

  ngOnInit(){

    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })

  }

  get regFormControls() { return this.registerForm.controls; }

  handleRegistration(){
    if(this.registerForm.valid){
      const { fname, lname, email, password } = this.registerForm.value
      this.httpService.loginApiCall('/api/v1/users/signup', {fname, lname, email, password}).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}
