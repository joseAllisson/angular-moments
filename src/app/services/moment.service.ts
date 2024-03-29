import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';
import { Moment } from '../interfaces/Moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/moment`

  constructor(private http: HttpClient) { }

  getMoments(
      page: number = 1,
      perPage: number = 20,
      searchTerm: string = ''): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(`${this.apiUrl}?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }

  removeMoment(id: number): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<FormData>(url);
  }
}
