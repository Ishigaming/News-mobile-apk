import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
  standalone: false,
})
export class NewsDetailsPage implements OnInit {
  article: any;

  constructor(private route: ActivatedRoute, private iab: InAppBrowser) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['article']) {
        this.article = JSON.parse(params['article']);
      }
    });  }

  openInBrowser() {
    if (this.article.url) {
      this.iab.create(this.article.url, '_blank', {
        location: 'yes'
      });
    }
  } openUrl(url: string) {
    this.iab.create(url, '_system'); 
  }
  

}
