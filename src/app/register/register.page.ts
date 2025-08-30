import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../services/services/countries';
import { last } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  countries: any[] = [];
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private countrisService: CountriesService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {

    this.countrisService.getCountries().subscribe(res => {
      if (res && res.data){
        this.countries = res.data;
      }
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  doRegister() {
    if (this.registerForm.valid) {
      const { name, lastName, country,  email, password } = this.registerForm.value;
      console.log("Registering user:", { name, lastName, country, email, password });
      this.router.navigate(['/login']);
    } else {
      console.log("Invalid form");
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
