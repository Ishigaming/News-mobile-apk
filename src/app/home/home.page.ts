import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/services/auth.service';
import { ToastController } from '@ionic/angular';
import { NewsService } from '../services/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  articles: any[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private newsService: NewsService,
  ) {

   }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.newsService.getTopHeadlines('us').subscribe({
      next: (res) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

 async logout() {
  this.authService.logout();

  const toast = await this.toastController.create({
    message: 'Logged out succesfully',
    duration: 2000,
    position: 'bottom',
    color: 'success',
  });
 }
}
