import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/services/auth.service';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from '../services/services/countries';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  profileForm!: FormGroup;
  showPassword = false;
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private countriesService: CountriesService,

  ) {   this.profileForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email]],
    newPassword: ['', Validators.required],
    currentPassword: ['', Validators.required],
    nationality: ['', Validators.required],
  });
  }

  ngOnInit() {
    this.countriesService.getCountries().subscribe(res => {
      if (res && res.data){
        this.countries = res.data;
      }
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      this.profileForm.patchValue({
        name: currentUser.name,
        lastName: currentUser.lastName,
        nationality: currentUser.nationality,
        email: currentUser.email,
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      console.log('Updated user:', updatedUser);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

      const hashedCurrentPassword = CryptoJS.SHA256(formValues.currentPassword).toString();
      if (currentUser.password && currentUser.password !== hashedCurrentPassword) {
        alert('Incorrect password');
        return;
      }
      const updatedUser: User = {
        ...currentUser,
        ...formValues,
        password: CryptoJS.SHA256(formValues.newPassword).toString() 
      };

      this.authService.updateUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      alert('Updated succeprofiles succesfully');
      this.router.navigate(['/home']);
    }
  }
}