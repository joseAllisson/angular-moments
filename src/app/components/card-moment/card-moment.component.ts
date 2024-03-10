import { Component, Input, OnInit } from '@angular/core';
import { Moment } from 'src/app/interfaces/Moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-moment',
  templateUrl: './card-moment.component.html',
  styleUrls: ['./card-moment.component.scss']
})
export class CardMomentComponent implements OnInit {
  @Input() moment!: Moment;
  baseApiUrl = environment.baseApiUrl;

  constructor() { }

  ngOnInit(): void {
  }
}
