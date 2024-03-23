import { Component, HostListener, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import * as momentDate from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTimeout: any;
  page: number = 1;
  perPage: number = 20;
  searchTerm: string = "";

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.getMoments();
  }

  search(event: Event): void {
    clearTimeout(this.searchTimeout);

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.searchTimeout = setTimeout(() => {
      this.page = 1;
      this.perPage = 20;
      this.searchTerm = value;
      this.getMoments();
    }, 500);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(_: Event): void {
    const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

    if (atBottom) {
      this.page++;
      this.getMoments(true);
    }
  }

  getMoments( infiniteScroll: boolean = false): void {
    this.momentService.getMoments(this.page, this.perPage, this.searchTerm).subscribe(items => {
      const data = items.data;

      data.map(item => {
        item.created_at = momentDate(item.created_at).format('DD/MM/YYYY');
      });

      if (infiniteScroll) {
        this.moments = this.moments.concat(data);
        return;
      }

      this.moments = data;
    });
  }
}
