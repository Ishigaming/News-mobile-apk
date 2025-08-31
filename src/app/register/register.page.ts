import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../services/services/countries';
import { last } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';


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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private countrisService: CountriesService,
    public alertController: AlertController,
    private toastController: ToastController
    ) {
      
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
    if (this.registerForm.valid){
      console.log(this.registerForm.value);

      this.router.navigate(['/login'])
     }
  }

  async doRegister() {
    if(this.registerForm.hasError('passwordMismatch')){
      const toast = await this.toastController.create({
        message: 'Passwords do not match',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      })
      await toast.present();
      return;
    }
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const hashedPassword = CryptoJS.SHA256(formValues.password).toString();

      let users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

      const newUser = {
        name: formValues.name,
        lastName: formValues.lastName,
        nationality: formValues.nationality,
        email: formValues.email,
        password: hashedPassword
      };
      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));

      const toast = await this.toastController.create({
        message: 'Account succefully created',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      })

      await toast.present();
      this.router.navigate(['/login']);

    } else {
       const toast = await this.toastController.create({
        message: 'Please fill in all required fields',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
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
