import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/services/auth.service';
import { ToastController } from '@ionic/angular';
import { NewsService } from '../services/news';
import { MenuController } from '@ionic/angular';
import { last } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  articles: any[] = [];
  loading = true;
  category = '';
  page = 1;
 
  user = {
    name: '',
    lastName: '',
    avatar: 'assets/avatar.png',
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private newsService: NewsService,
    private menuCtrl: MenuController,
  ) {

   }

  ngOnInit() {
    this.loadNews();

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  loadNews() {
    this.loading = true;
    this.page = 1;
    this.newsService.getTopHeadlines('us', this.page, this.category).subscribe({
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
  
  loadMoreNews(event: any) {
    this.page++;
    this.newsService.getTopHeadlines('us',this.page, this.category).subscribe((data: any) => {
      this.articles = [...this.articles, ...data.articles];
      event.target.complete();

      if (data.articles.length === 0) {
        event.target.disabled = true;
      }
    });

  }
  changeCategory(cate: string) {
    this.category = cate;
    this.loadNews();
    this.menuCtrl.close();
  }

  openArticle(article: any) {
    this.router.navigate(['/news-details']); { state: { article }};
  }

  openMenu() {
    this.menuCtrl.open('main-menu')
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

 async logout() {
  localStorage.removeItem('user');
    window.location.href = '/login'; 

  const toast = await this.toastController.create({
    message: 'Logged out succesfully',
    duration: 2000,
    position: 'bottom',
    color: 'success',
  });
 }
}
