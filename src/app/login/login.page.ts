import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {}

  doLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log("Login with:", email, password);

  }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
