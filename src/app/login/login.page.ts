import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.reset();
  }

  async doLogin() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const usersData = localStorage.getItem('users'); 

      if (usersData) {
        const users = JSON.parse(usersData);
        const hashedPassword = CryptoJS.SHA256(formValues.password).toString();
        const user = users.find((u: any) => u.email === formValues.email && u.password === hashedPassword);

        if (user) {
          console.log("Login successful");
          localStorage.setItem('user', JSON.stringify(user)); 
          this.router.navigate(['/home']);
        } else {
          const toast = await this.toastController.create({
            message: 'Invalid user or password',
            duration: 2000,
            position: 'bottom',
            color: 'danger',
          });
          await toast.present();
        }
      } else {
        const toast = await this.toastController.create({
          message: 'No users registered yet',
          duration: 2000,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
