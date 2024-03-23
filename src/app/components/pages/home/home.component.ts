import { Component, OnInit } from '@angular/core';

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

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = "";

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe(items => {
      const data = items.data;

      data.map(item => {
        item.created_at = momentDate(item.created_at).format('DD/MM/YYYY');
      });

      data.sort((a, b) => Number(b.id) - Number(a.id));

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement
    const value = target.value.toLowerCase()

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value)
    });
  }
}
